const menuOpenButton = documen.querySelector("#menu-open-button");
const menuCloseButton = documen.querySelector("#menu-clsoe-button");


menuOpenButton.addEventListener("click", () => {

    document.body.classList.toogle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click
());