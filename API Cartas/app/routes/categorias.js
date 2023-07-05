const express = require('express');
const {obtenerCategorias} = require('../controllers/categorias.controller');
const router = express.Router();
router.get('/listar-categorias',obtenerCategorias);
module.exports = router;