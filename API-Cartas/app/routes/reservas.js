const express = require('express');

const {
  //obtenerReservasCliente,
  reservarCarta,
  obtenerReservaCartaPorId,
  //obtenerReservaPorId,
 // atenderReserva,
} = require("../controllers/reservas.controller.js");

const router = express.Router();
//router.get('/detallar-reservas-cartas/:idReservacion', obtenerReservaPorId);
//router.get('/cliente/:idCliente', obtenerReservasCliente);
router.post('/reservar-cartas', reservarCarta);
//router.put('/atender/:idReservacion', atenderReserva);
router.get('/detallar-reservas-cartas/:idReservacion', obtenerReservaCartaPorId);

module.exports = router;