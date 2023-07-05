const express = require('express');
const {obtenerPlatillos,obtenerPlatilloPorId} = require('../controllers/platillos.controller');
const router = express.Router();

router.get('/listar-platillos', obtenerPlatillos);
router.get('/detallar-platillos/:idPlatillo',obtenerPlatilloPorId);

module.exports = router;