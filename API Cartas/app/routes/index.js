const express = require('express');

const platillosRutas = require('./platillos.js');
const reservacionesRutas = require('./reservas.js');
const categoriasRutas = require('./categorias.js');


function routerApi(app){
    const router = express.Router();
    app.use('/ne-cartas/servicio-al-cliente',router);
        router.use('/v1',platillosRutas);
        router.use('/v1',reservacionesRutas);
        router.use('/v1',categoriasRutas);
};

module.exports = routerApi;