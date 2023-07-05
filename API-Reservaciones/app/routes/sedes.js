const express = require('express');
const {
  obtenerSedes,
  obtenerSedePorId
} = require("../controllers/sedes.js");

const router = express.Router();

router.get('/listar-sedes', obtenerSedes);

router.get('/detallar-sedes/:id_sede', obtenerSedePorId)


module.exports = router;