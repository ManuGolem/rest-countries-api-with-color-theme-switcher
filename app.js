const toggleDark = document.querySelector("#toggle-dark");
const textoBoton = toggleDark.querySelector("span");
const body = document.querySelector("body");
const container = document.querySelector(".container-banderas");
const botonFilter = document.querySelector("#filter");
const modal = document.querySelector(".modal");
const botonesModal = modal.querySelectorAll("button");
const input = document.querySelector("input");
let girado = false;
document.addEventListener("DOMContentLoaded", () => {
    actualizarMode();
    traerDatos(mostarDatos);
    botonFilter.addEventListener("click", () => {
        abrirModal();
    });
    input.addEventListener("input", (e) => {
        traerDatos(filtrarDatosNombre, e.target.value);
    });
    botonesModal.forEach((boton) => {
        boton.addEventListener("click", () => {
            abrirModal();
            traerDatos(filtrarDatosPorRegion, boton.textContent);
        });
    });
    toggleDark.addEventListener("click", () => {
        body.classList.toggle("darkMode");
        if (body.classList.contains("darkMode")) {
            textoBoton.textContent = "Light Mode";
        } else {
            textoBoton.textContent = "Dark Mode";
        }
    });
});
function abrirModal() {
    const imagen = botonFilter.querySelector("svg");
    girado
        ? ((girado = false),
          imagen.setAttribute("transform", "rotate(0)"),
          (modal.style.display = "none"),
          traerDatos(mostarDatos))
        : ((girado = true),
          imagen.setAttribute("transform", "rotate(90)"),
          (modal.style.display = "flex"));
}
function traerDatos(funcion, parametro) {
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            funcion(data, parametro);
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
function mostarDatos(datos) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
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

//Esta funcion va a devolver un array con los paises ordenados por region
function filtrarDatosPorRegion(datos, region) {
    datos = datos.filter((pais) => pais.region == region);
    mostarDatos(datos);
}
function filtrarDatosNombre(datos, nombre) {
    datos = datos.filter(
        (pais) =>
            pais.name.toUpperCase().split(nombre.toUpperCase()).length != 1,
    );
    mostarDatos(datos);
}
