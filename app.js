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

        //Agregar evento al card
        div.addEventListener("click", () => {
            mostrarPais(pais);
        });
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
function mostrarPais(pais) {
    const {
        name,
        population,
        nativeName,
        region,
        capital,
        subregion,
        currencies,
        languages,
        topLevelDomain,
        borders,
        flags,
    } = pais;
    const imagen = document.createElement("img");
    imagen.src = flags.png;
    const botonvolver = document.createElement("button");
    botonvolver.classList.add("botonvolver");
    botonvolver.addEventListener("click", () => {
        location.reload();
    });
    botonvolver.textContent = "Back";
    //agregar flecha svg al boton
    const nametitle = document.createElement("h1");
    nametitle.textContent = name;
    const nn = document.createElement("p");
    nn.innerHTML = `<strong>Native Name: </strong>${nativeName}`;
    const pp = document.createElement("p");
    pp.innerHTML = `<strong>Population: </strong>${population}`;
    const rg = document.createElement("p");
    rg.innerHTML = `<strong>Region: </strong>${region}`;
    const sr = document.createElement("p");
    sr.innerHTML = `<strong>Subregion: </strong>${subregion}`;
    const cp = document.createElement("p");
    cp.innerHTML = `<strong>Capital: </strong>${capital}`;
    const tld = document.createElement("p");
    tld.innerHTML = `<strong>Top Level Domain: </strong>${topLevelDomain[0]}`;
    const crr = document.createElement("p");
    crr.innerHTML = `<strong>Currencies: </strong>${currencies[0].name}`;
    const lgg = document.createElement("p");
    lgg.innerHTML = `<strong>Languages: </strong>${languages.map((idioma) => idioma.name).join(", ")}`;
    const bc = document.createElement("p");
    const divParrafo = document.createElement("div");
    borders &&
        ((bc.textContent = "Border Countries: "),
            bc.classList.add("border"),
            borders.forEach((borde) => {
                const boton = document.createElement("button");
                boton.classList.add("botonBorde");
                boton.addEventListener("click", () => {
                    //Aca hacer llamada rara
                });
                boton.textContent = borde; //Esto es momentaneo no funciona asi
                divParrafo.appendChild(boton);
            }),
            bc.appendChild(divParrafo));
    const infoLeft = document.createElement("div");
    infoLeft.appendChild(nn);
    infoLeft.appendChild(pp);
    infoLeft.appendChild(rg);
    infoLeft.appendChild(sr);
    infoLeft.appendChild(cp);
    const infoRight = document.createElement("div");
    infoRight.appendChild(tld);
    infoRight.appendChild(crr);
    infoRight.appendChild(lgg);
    const info = document.createElement("section");
    info.appendChild(infoLeft);
    info.appendChild(infoRight);
    info.classList.add("informacion");
    const infoResume = document.createElement("div");
    infoResume.appendChild(nametitle);
    infoResume.appendChild(info);
    infoResume.appendChild(bc);
    infoResume.classList.add("infoResume");
    const sectionPais = document.createElement("section");
    sectionPais.classList.add("sectionPais");
    const main = document.querySelector("main");
    main.classList.add("main")
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    const sectionPage=document.createElement("section");
    sectionPage.appendChild(botonvolver)
    sectionPage.appendChild(sectionPais)
    sectionPage.classList.add("sectionPage")
    sectionPais.appendChild(imagen);
    sectionPais.appendChild(infoResume);
    
    main.appendChild(sectionPage);
}
