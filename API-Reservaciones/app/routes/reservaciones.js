const express = require('express');

const {
  listarReservaciones,
  crearReservacion,
  obtenerReservasSede,
  obtenerReservasCliente,
  obtenerReservaPorId,
  atenderReserva,
  actualizarReserva,
  eliminarReserva,
  verificarReserva
} = require("../controllers/reservaciones.js");

const router = express.Router();


router.post('/crear-reservaciones', crearReservacion)

router.get('/detallar-reservaciones/:id_reservacion', obtenerReservaPorId)

router.get('/listar-reservaciones', listarReservaciones)

router.get('/listar-reservaciones-sedes/:id_sede', obtenerReservasSede)

router.get('/listar-reservaciones-clientes/:id_cliente', obtenerReservasCliente);

router.put('/actualizar-reservaciones/:id_reservacion', actualizarReserva);

router.delete('/eliminar-reservaciones/:id_reservacion', eliminarReserva);

router.get('/verificar-reservaciones/:id_reservacion', verificarReserva);

router.put('/atender-reservaciones/:id_reservacion', atenderReserva);


module.exports = router;