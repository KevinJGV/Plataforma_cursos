"use strict";

const NAME_COURSE = document.querySelector("#name");
const DESCRP_COURSE = document.querySelector("#descr");
const CONTENT_COURSE = document.querySelector("#content");
const FORM_BUTTON_CREATE = document.querySelector("#form_button");
const FORM_BUTTON_FILTER = document.querySelector("#form_button_q");
const SECTION = document.querySelector("section");

async function gettData() {
    return await new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("title", NAME_COURSE.value);
            localStorage.setItem("description", DESCRP_COURSE.value);
            localStorage.setItem("content", CONTENT_COURSE.value);
            resolve();
        }, 1500);
    });
};

function card_constructor() {
    if (
        localStorage.getItem("title") !== "" &&
        localStorage.getItem("description") !== "" &&
        localStorage.getItem("content") !== ""
    ) {
        const CARD = document.createElement("div");
        CARD.classList.add("card");
        const TITLE = document.createElement("h5");
        TITLE.classList.add("text_center");
        const STRONG = document.createElement("strong");
        STRONG.textContent = "Curso: ";
        TITLE.insertAdjacentElement("beforeend", STRONG);
        TITLE.insertAdjacentText("beforeend", localStorage.getItem("title"));
        const IMG_BOX = document.createElement("div");
        IMG_BOX.classList.add("img_box", "flex_col", "j-all_c");
        const IMG = document.createElement("img");
        IMG.src = "https://cdn-icons-png.flaticon.com/512/3426/3426653.png";
        IMG.classList.add("text_center");
        IMG_BOX.insertAdjacentElement("beforeend", IMG);
        const DESCRIPTION_p = document.createElement("p");
        DESCRIPTION_p.classList.add("block", "text_center");
        const DESCRIPTION_i = document.createElement("i");
        DESCRIPTION_i.insertAdjacentText(
            "beforeend",
            localStorage.getItem("description")
        );
        DESCRIPTION_p.insertAdjacentElement("beforeend", DESCRIPTION_i);
        const H6 = document.createElement("h6");
        H6.classList.add("text_center");
        H6.textContent = "Contenido academico";
        const CONTENT = document.createElement("p");
        CONTENT.classList.add("content");
        CONTENT.insertAdjacentText(
            "beforeend",
            localStorage.getItem("content")
        );
        const EDIT_BUTTON = document.createElement("button");
        EDIT_BUTTON.classList.add("pointer");
        EDIT_BUTTON.id = "edit_button";
        EDIT_BUTTON.textContent = "Editar";
        const DEL_BUTTON = document.createElement("button");
        DEL_BUTTON.classList.add("pointer");
        DEL_BUTTON.id = "del_button";
        DEL_BUTTON.textContent = "Eliminar";
        [
            TITLE,
            IMG_BOX,
            DESCRIPTION_p,
            H6,
            CONTENT,
            EDIT_BUTTON,
            DEL_BUTTON,
        ].forEach((node) => CARD.insertAdjacentElement("beforeend", node));
        return CARD;
    } else (
        alert("Debe llenar todos los campos para agregar un nuevo curso")
    )
};

function updateButtons() {
    let edit_buttons = document.querySelectorAll("#edit_button");
    let del_buttons = document.querySelectorAll("#del_button");

    edit_buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            let h5_card = event.target.parentElement.querySelector("h5");
            h5_card.textContent = "";
            let strong = document.createElement("strong");
            strong.textContent = "Curso: ";
            h5_card.insertAdjacentElement("beforeend", strong);
            h5_card.insertAdjacentText(
                "beforeend",
                validarPrompt(prompt("Nuevo nombre del curso"))
            );
            let descr_card = event.target.parentElement.querySelector("i");
            descr_card.textContent = validarPrompt(
                prompt("Nueva descripción del curso")
            );
            let content_card =
                event.target.parentElement.querySelector(".content");
            content_card.textContent = validarPrompt(
                prompt("Nuevo contenido del curso")
            );
        });
    });

    del_buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.target.parentElement.remove();
        });
    });
};

function validarPrompt(msg) {
    while (true) {
        if (msg === "") {
            msg = prompt("Ingrese algun contenido");
        } else {
            return msg;
        }
    }
}

FORM_BUTTON_CREATE.addEventListener("click", async () => {
    await gettData();
    const ITEM = card_constructor();
    SECTION.insertAdjacentElement("beforeend", ITEM);
    updateButtons();
});

updateButtons();
