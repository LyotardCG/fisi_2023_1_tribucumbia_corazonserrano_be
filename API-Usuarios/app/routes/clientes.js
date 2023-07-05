const express = require('express');

const { obtenerClientes, obtenerClientePorId, modificarCliente, eliminarCliente } = require('../controllers/clientes.js');

const router = express.Router();

router.get('/listar-usuarios-clientes', obtenerClientes);

router.get('/detallar-usuarios-clientes/:idCliente', obtenerClientePorId);

router.put('/actualizar-usuarios-clientes/:idCliente', modificarCliente);

router.delete('/eliminar-usuarios-clientes/:idCliente', eliminarCliente);


module.exports = router;