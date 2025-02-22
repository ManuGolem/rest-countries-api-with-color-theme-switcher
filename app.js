const toggleDark = document.querySelector("#toggle-dark");
const textoBoton = toggleDark.querySelector("span");
const body = document.querySelector("body");
const container = document.querySelector(".container-banderas");
document.addEventListener("DOMContentLoaded", () => {
    actualizarMode();
    traerDatos();
    toggleDark.addEventListener("click", () => {
        body.classList.toggle("darkMode");
        if (body.classList.contains("darkMode")) {
            textoBoton.textContent = "Light Mode";
        } else {
            textoBoton.textContent = "Dark Mode";
        }
    });
});
async function traerDatos() {
    const datos = await fetch("data.json").then((res) => res.json());
    console.log(datos);
    datos.forEach((pais) => {
        const div = document.createElement("div");
        const bandera = document.createElement("img");
        const nombre = document.createElement("h1");
        const poblacion = document.createElement("p");
        const region = document.createElement("p");
        const capital = document.createElement("p");
        const divinfo = document.createElement("div");
        nombre.classList.add("title");
        nombre.textContent = pais.name;
        poblacion.innerHTML = `<strong>Population: </strong>${pais.population}`;
        region.innerHTML = `<strong>Region: </strong>${pais.region}`;
        capital.innerHTML = `<strong>Population: </strong>${pais.capital}`;
        bandera.src = pais.flags.png;
        divinfo.classList.add("info");
        div.classList.add("card");
        div.appendChild(bandera);
        divinfo.appendChild(nombre);
        divinfo.appendChild(poblacion);
        divinfo.appendChild(region);
        divinfo.appendChild(capital);
        div.appendChild(divinfo);
        container.appendChild(div);
    });
}
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
