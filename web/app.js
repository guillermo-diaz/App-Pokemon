const CONFIG = require('../mobile/src/Config/config');
const express = require("express"); // Requerimos el módulo de express
const app = express(); // Inicializamos el servidor
const port = CONFIG.PORT;
const ip = CONFIG.IP; 
const path = require('path');

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'archivos')));

// Middleware para procesar datos en las solicitudes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use('/API/pokemon', require('./routes/pokemon'));

// Iniciar el servidor escuchando en la IP y puerto especificados
app.listen(port, ip, function () {
  console.log(`Servidor escuchando en http://${ip}:${port}/html/index.html`);
});


