const { Router } = require('express');
const router = Router();
const pokemons = require('../archivos/Pokedex/pokemons.json');

router.get('/', (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); 
    
    let results = {};
    
    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return res.status(400).json({ error: 'Índices incorrectos.' });
    } 
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex < pokemons.length) {
        results.results = pokemons.slice(startIndex, endIndex);

        // Si todavía hay más Pokémon después del endIndex, añade nextPage
        if (endIndex < pokemons.length) {
            results.next = { page: page + 1 };
        } else {
            results.next = null; // No hay más páginas
        }
    } else {
        results.results = []; // No hay más datos en esa página
        results.next = null;
    }
    
    res.json(results);
});


//buscar por nombre
router.get('/:nombrePokemon', (req, res) => {
    const nombreABuscar = req.params.nombrePokemon;

    if (nombreABuscar === "" || nombreABuscar === ":") {
        return res.status(400).json({ error: 'Nombre de Pokémon no proporcionado en la consulta.' });
    }

    const resultados = pokemons.filter(pokemon => nombreABuscar.toLowerCase().includes(pokemon.nombre.toLowerCase()));

    res.json(resultados);
});

router.post('/', (req, res) => {
    const { id, nombre, tipos, estadisticas, habilidades, especie, descripcion, habitat } = req.body;

    // Validar que los campos requeridos estén presentes y sean del tipo esperado
    if (
        id && typeof id === 'number' &&
        nombre && typeof nombre === 'string' &&
        tipos && Array.isArray(tipos) && tipos.length > 0 &&
        estadisticas && Array.isArray(estadisticas) && estadisticas.length > 0 &&
        habilidades && Array.isArray(habilidades) &&
        especie && typeof especie === 'string' &&
        descripcion && typeof descripcion === 'string' &&
        habitat && typeof habitat === 'string'
    ) {
        // Creo pokemon
        const nuevoPokemon = { ...req.body };

        // Agregar nuevo pokemon al arreglo de pokemons
        pokemons.push(nuevoPokemon);
        res.json(pokemons);
        console.log("Dato ingresado exitosamente");
    } else {
        // Alguno de los campos requeridos está ausente o tiene un tipo incorrecto
        res.status(400).json({ error: 'Datos de entrada no validos' });
    }
});

router.put('/:nombrePokemon', (req, res) => {
    const nombreABuscar = req.params.nombrePokemon;
    const { id, nombre, tipos, estadisticas, habilidades, especie, descripcion, habitat } = req.body;
    console.log("Nombre a buscar:" + nombreABuscar);
    console.log("Solicitud:" + req.body);

    const pokemonElegido = pokemons.find(pokemon => nombreABuscar.toLowerCase() === pokemon.nombre.toLowerCase());

    if (!pokemonElegido) {
        return res.status(404).json({ error: "Pokemon no encontrado" });
    }

    if (id  && typeof id !== 'number') {
        return res.status(400).json({ error: "El campo 'id' debe ser un número" });
    }

    if (nombre && typeof nombre !== 'string') {
        return res.status(400).json({ error: "El campo 'nombre' debe ser una cadena de texto" });
    }

    if (tipos && (!Array.isArray(tipos) || !tipos.every(tipo => typeof tipo === 'string'))) {
        return res.status(400).json({ error: "El campo 'tipos' debe ser un arreglo de cadenas de texto" });
    }

    if (estadisticas && (!Array.isArray(estadisticas) || !estadisticas.every(est => est && typeof est.nombre === 'string' && typeof est.valor_base === 'number'))) {
        return res.status(400).json({ error: "El campo 'estadisticas' debe ser un arreglo con objetos que tengan 'nombre' como cadena de texto y 'valor_base' como número" });
    }

    if (descripcion && typeof descripcion !== 'string') {
        return res.status(400).json({ error: "El campo 'descripcion' debe ser una cadena de texto" });
    }

    // Actualizar datos solo si los campos son proporcionados y válidos
    if (id ) {
        pokemonElegido.id = id;
    }
    if (nombre) {
        pokemonElegido.nombre = nombre;
    }
    if (tipos) {
        pokemonElegido.tipos = tipos;
    }
    if (estadisticas) {
        pokemonElegido.estadisticas = estadisticas;
    }
    if (descripcion) {
        pokemonElegido.descripcion = descripcion;
    }

    // Devolver solo los datos actualizados
    res.json(pokemonElegido);
});
module.exports = router;