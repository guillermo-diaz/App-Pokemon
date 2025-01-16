loadTheme();

function load_header() {
    let header = document.createElement("header");
    header.className = "container-fluid";

    header.innerHTML = `
            <nav class="navbar navbar-expand-md">
                <a class="navbar-brand">
                    <img class="logo" src="../img/pokemonLogo.png" alt="logo pokemon">
                </a>
    
                <button class="navbar-toggler btn-collapse" data-bs-toggle="collapse" data-bs-target="#opcionesNav" aria-controls="opcionesNav" aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="opcionesNav">
                    <div class="nav">
                        <a id="nav-inicio" href="../html/index.html">
                            <span class="iconify icon" data-icon="ion:home-outline"></span>
                            <span class="text">inicio</span>
                        </a>
                        <a id="nav-pokedex" href="../html/pokedex.html">
                            <span class="iconify icon" data-icon="iconoir:pokeball"></span>
                            <span class="text">Pokedex</span>
                        </a>
                        <a id="nav-build" href="../html/build.html">
                            <span class="iconify icon" data-icon="material-symbols:swords"></span>
                            <span class="text">Build</span>
                        </a>
                        <div id="cambiarTheme">
                            <div id="pokeball-button" class="light-theme"></div>
                        </div>
                    </div>
                </div>
            </nav>
        `;

    let body = document.body;
    body.insertBefore(header, body.firstChild);
}


document.addEventListener("DOMContentLoaded", () => {
    load_header();
    changeTheme();
});

//carga el theme a la pagina
function loadTheme(){
    const darkmode = localStorage.getItem('darkmode');
    const body = document.querySelector('body');

    //if the dark mode was never activated
    if(darkmode === null){
        storeTheme(false);
    } else if( darkmode === 'true'){ //if the dark mode is activated
        body.classList.add('darkmode');
    } 

}

//agrego funcionalidad al boton
function changeTheme(){
    const btnTheme = document.querySelector("#cambiarTheme")
    const body = document.querySelector('body');

    btnTheme.addEventListener('click', () =>{
        body.classList.toggle('darkmode');
        storeTheme(body.classList.contains('darkmode'));
    })
}

//guardo en localstorage si el darkmode esta activado
function storeTheme(value){
    localStorage.setItem('darkmode', value);
  }
