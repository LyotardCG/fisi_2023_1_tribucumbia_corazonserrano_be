const express = require('express');

const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  modificarUsuario,
  eliminarUsuario,
  listarEmpleados,
  obtenerEmpleadoPorId,
} = require("../controllers/usuarios.js");

const router = express.Router();

// Todos los usuarios
router.get('/listar-usuarios', obtenerUsuarios);

router.get('/detallar-usuarios/:id_usuario', obtenerUsuarioPorId);

// Solo rol Empleado
router.get('/listar-usuarios-empleados', listarEmpleados);

router.get('/detallar-usuarios-empleados/:id_usuario', obtenerEmpleadoPorId);

router.put('/actualizar-usuarios-empleados/:id_usuario', modificarUsuario);

router.delete('/eliminar-usuarios-empleados/:id_usuario', eliminarUsuario);


module.exports = router;