
const url = 'https://solid-knowing-celestite.glitch.me/users';
const content = document.querySelector(".content");
const AddBtn = document.querySelector(".add-btn");
getData();
function getData() {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            content.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                content.innerHTML +=
                    `
    <div class="cards">
    <div class="img-card">
        <img class="img-input" src=${data[i].img} alt="">
    </div>

    <h3 class="name-surname">${data[i].name} ${data[i].surname}</h3>
    <p class="par-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque magnam quae vitae.</p>   
    <button data-src=${data[i].img} data-role = "show-img" class="show-button"><i class="fa-solid fa-eye"></i></button>
    <button data-id = ${data[i].id} data-role = "delete-div"class="delete-button"><i class="fa-solid fa-trash"></i></button>

</div>
    `

            }
        })
}


const inputName = document.querySelector(".input-name"),
    inputSurname = document.querySelector(".input-surname"),
    inputImg = document.querySelector(".input-img");
FrameImg = document.querySelector(".input-img img");


AddBtn.addEventListener("click", function () {
    const name = inputName.value,
        surname = inputSurname.value,
        img = inputImg.value;

    const newUsers =
    {
        name,
        surname,
        img
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsers)
    })
        .then(function (response) {
            if (response.ok === true) {
                getData();
            }
        })


})
const card = document.querySelector(".cards");
const deleteButton = document.querySelector(".delete-button")
const ShowButton = document.querySelector(".show-button");
const CloseButton = document.querySelector(".frame-div-inner button");
const frameDiv = document.querySelector(".frame-div");
const frameDivImg = document.querySelector(".frame-div-inner img");
const UpdateImg = par => frameDivImg.src = par;
document.addEventListener("click", function (e) {
    if (e.target.dataset.role == "show-img") {
        UpdateImg(e.target.dataset.src);
        frameDiv.style.display = "flex";

    }
    if (e.target.dataset.role == "delete-div") {
        const id = e.target.dataset.id;
     fetch(`${url}/${id}`,{
        method: 'DELETE'
     })
     .then(function (response) {
        if (response.ok === true) {
            getData();
        frameDiv.style.display = "none";
        }
        })
       
    }
})
CloseButton.addEventListener("click", function () {
    frameDiv.style.display = "none";
})

