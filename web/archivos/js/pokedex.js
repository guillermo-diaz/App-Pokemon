let modal;
const colores = {
    fire: "#ff7402",
    grass: "#9bcc50",
    steel: "#9eb7b8",
    water: "#4592c4",
    psychic: "#f366b9",
    ground: "#ab9842",
    ice: "#51fff0",
    flying: "#3dc7ef",
    ghost: "#753a79",
    normal: "#a4acaf",
    poison: "#882869",
    rock: "#a38c21",
    fighting: "#d56723",
    dark: "#707070",
    bug: "#729f3f",
    dragon: "linear-gradient(to bottom, #8859f5, #e0e0e0)",
    electric: "#f8e325",
    fairy: "#fdb9e9",
    shadow: "#7b62a3"
};

const coloresTipos = {
    grass: "#bfe487",
    poison: "rgb(247, 125, 228)",
    fire: "rgb(243, 154, 53)",
    water: "lightblue",
    bug: "#a4d96b",
    normal: "rgb(214, 205, 205)",
    electric: "rgb(247, 247, 143)",
    ground: "rgb(201, 191, 104)",
    psychic: "rgb(233, 190, 197) ",
    rock: "#ceb33a",
    fighting: "#e8b698",
    ghost: "#d0a5d3",
    ice: "#c9f5f1",
    fairy: "#fdcfef",
    steel: "#aac6c7",
    dragon: "linear-gradient(to bottom, #8e61f8, #bea6f5)",
    flying: "linear-gradient(to top, #9b9a9a, #bebebe)"
}

let cantidadPokemons = 0;

function cargarMasPokemons() {
    const limit = 12;
    const page = (cantidadPokemons + limit) / limit;

    fetch(`http://localhost:3000/API/pokemon?page=${page}&limit=${limit}`)
        .then(response => {
            if (response.ok) {
                return response.json(); // Convertir la respuesta a JSON
            }

        })
        .then(siguientePokemons => {
            if (siguientePokemons && siguientePokemons.results && siguientePokemons.results.length > 0) {
                cantidadPokemons += 12;
                mostrarCards(siguientePokemons.results);
            } else {
                throw new Error('La solicitud no fue exitosa');
            }
        })
        .catch(error => {
            console.error('Hubo un error', error);
        });
}

function sentinelaVisible(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cargarMasPokemons();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    agregarColoresCards(); // inserta en css todos los posibles colores
    agregarColoresTipos();
    mostrarPokemon();

    //observer para cards
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(sentinelaVisible, options);
    const sentinela = document.querySelector('#sentry');
    observer.observe(sentinela);
})

//para la busqueda
function mostrarPokemon() {
    const input = document.querySelector('#search-pokemon');
    const btn = document.querySelector('#btn-search');


    btn.addEventListener("click", (event) => {
        event.preventDefault();
        const nombrePokemon = input.value.toLowerCase();
        input.value = "";
        fetch("http://localhost:3000/API/pokemon/" + nombrePokemon)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                let pokemonBuscado = data[0];
                let stats = pokemonBuscado.estadisticas;
                let label = document.querySelector('.modal-header h1');
                let nameLabel = pokemonBuscado.nombre;
                label.textContent = "Información de " + nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1);
                fillModal(stats[0].valor_base, stats[1].valor_base, stats[2].valor_base, stats[3].valor_base, stats[4].valor_base, stats[5].valor_base);
                insertImg('../img/asset-pokemon/' + getImagen(pokemonBuscado.id) + '.png');
                modal.show();
            })
            .catch(error => {
                // error en la consola
                console.error('Error al obtener información del Pokémon:', error);
            });
    });



}


function agregarColoresTipos() {
    let styles = document.createElement('style');
    styles.textContent = '';

    for (let key in coloresTipos) {
        let css = `.span-${key} { background: ${coloresTipos[key]};
    }\n`;
        styles.textContent += css;
    }

    document.head.appendChild(styles);
}

function agregarColoresCards() {
    let styles = document.createElement('style');
    styles.textContent = '';

    for (let key in colores) {
        let css = `div.${key}.pokemon-card, div.${key}.pokemon-card .card-container-name { background: ${colores[key]}; }\n`;
        styles.textContent += css;
    }

    document.head.appendChild(styles);
}

function mostrarCards(datos) {
    const containerCards = document.querySelector('#cards-container');

    datos.forEach((pokemon) => {

        let card = document.createElement('div');
        card.classList.add('pokemon-card', getColorPorTipo(pokemon.tipos));


        let containerImgPokemon = document.createElement('div');
        containerImgPokemon.className = "container-img-pk";

        let img = document.createElement('img');
        let imgPath = '../img/asset-pokemon/' + getImagen(pokemon.id) + '.png';
        img.src = imgPath;

        let nameDiv = document.createElement('div');
        nameDiv.className = "card-container-name"
        let name = document.createElement('h2');
        name.textContent = pokemon.nombre;
        nameDiv.appendChild(name);

        let tipos = document.createElement('div');
        tipos.className = 'card-tipos'

        let tipo1 = document.createElement('span');
        tipo1.className = "span-" + pokemon.tipos[0];
        tipo1.textContent = pokemon.tipos[0];


        tipos.appendChild(tipo1);
        if (pokemon.tipos[1]) {
            let tipo2 = document.createElement('span');
            tipo2.textContent = pokemon.tipos[1];
            tipo2.className = "span-" + pokemon.tipos[1];
            tipos.appendChild(tipo2);
        }

        containerImgPokemon.appendChild(img)

        card.appendChild(containerImgPokemon);
        card.appendChild(nameDiv);

        card.appendChild(tipos);


        containerCards.appendChild(card);

        card.addEventListener("click", function () {
            // Abre el modal correspondiente

            let stats = pokemon.estadisticas;
            let label = document.querySelector('.modal-header h1');
            let nameLabel = pokemon.nombre;
            label.textContent = "Información de " + nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1);
            fillModal(stats[0].valor_base, stats[1].valor_base, stats[2].valor_base, stats[3].valor_base, stats[4].valor_base, stats[5].valor_base);
            insertImg(imgPath);
            modal.show();
        });
    })
}

function insertImg(imgPath) {
    const containerImg = document.querySelector("#img-pokemon-info");
    containerImg.innerHTML = "";
    let img = document.createElement('img');
    img.src = imgPath;
    containerImg.appendChild(img)
}

function fillModal(ps, attack, defense, specialAttack, specialDefense, speed) {
    setProgressBarWidth('ps-bar', ps);
    setProgressBarWidth('attack-bar', attack);
    setProgressBarWidth('defense-bar', defense);
    setProgressBarWidth('special-attack-bar', specialAttack);
    setProgressBarWidth('special-defense-bar', specialDefense);
    setProgressBarWidth('speed-bar', speed);
}

function setProgressBarWidth(barId, value) {
    const bar = document.getElementById(barId);
    const maxValue = bar.parentNode.getAttribute('aria-valuemax');
    const widthPercentage = (value / maxValue) * 100;
    bar.textContent = value;
    bar.style.width = widthPercentage + '%';
    bar.setAttribute('aria-valuenow', value);
}

//obtiene el nombre de la clase para aplicar color
function getColorPorTipo(tipos) {
    //falta arreglar cuando son de 2 tipos
    return tipos[0];
}

//agrega ceros a la imagen para armar la ruta
function getImagen(id) {
    if (id < 100) {
        id = (id < 10) ? '00' + id : '0' + id;
    }
    return id;
}

