//Api key

const API = "563492ad6f91700001000001d9097e44e79b47cd8ccef3f1433f5dc5";

//variables

const elInput = document.querySelector(".inpt");
const elBnt = document.querySelector(".btn");
const elCrads = document.querySelector(".cards_imges");

let searchText = "";
let search = false;

//default photos function

async function defaultPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API
        }
    })
    const responsive = await data.json();
    displayImages(responsive);
}

function displayImages(responsive) {
    responsive.photos.forEach((image) => {
        const newCard = document.createElement("div");
        newCard.classList.add("newCard");
        newCard.innerHTML = `
        <div class="container">
        <a href="${image.src.large}" target="_blank">
        <img src="${image.src.large}" alt="${image.url}" class="image">
        </a>
        <div class="img_info">
        <div class="user_info">
        <img src="${image.src.small}" alt="${image.url}" class="profile_image">
        <p class="photograph_author">${image.photographer}</p>.
        </div>
        <div class="buttons">
        <button class="download-btn"><i class="fa-solid fa-download"></i></button>
        </div>
        </div>
        </div>
        `;
        elCrads.appendChild(newCard);
    });

    const btn = document.querySelectorAll(".download-btn");
    const image = document.querySelectorAll(".image");
    btn.forEach((item, index) => {
        item.addEventListener("click", () => {
            fetchFile(image[index].src);
        });
    });
};

//Download button function

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = "filename";
        document.body.appendChild(aTag);
        console.log(tempUrl);
        aTag.click();
        aTag.remove();
    });
}

//Search photos function

async function searchPhotos(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API
        }
    })
    const responsive = await data.json();
    displayImages(responsive);
}

elInput.addEventListener("input", (e) => {
    e.preventDefault();
    searchText = e.target.value;
});

elBnt.addEventListener("click", () => {
    const success = document.querySelector(".toast");
    const danger = document.querySelector(".toast-danger")
    if (elInput.value === "") {
        danger.classList.toggle("hidden");
    } else {
        success.classList.toggle("hidden");
        clearImg();
        searchPhotos(searchText);
    }
})

//Clear function

function clearImg() {
    document.querySelector(".cards_imges").innerHTML = "";
}

defaultPhotos();


