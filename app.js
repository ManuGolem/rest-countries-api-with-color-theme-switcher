const toggleDark = document.querySelector("#toggle-dark");
const textoBoton = toggleDark.querySelector("span");
const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
    actualizarMode();
    toggleDark.addEventListener("click", () => {
        body.classList.toggle("darkMode");
        if (body.classList.contains("darkMode")) {
            textoBoton.textContent = "Light Mode";
        } else {
            textoBoton.textContent = "Dark Mode";
        }
    });
});
function actualizarMode() {
    const darkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
    if (darkMode) {
        body.classList.toggle("darkMode");
        textoBoton.textContent = "Light Mode";
    } else {
        body.classList.toggle("darkMode");
        textoBoton.textContent = "Dark Mode";
    }
}
