const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const usuariosService = require('../services/usuarios.js');

const service = new usuariosService();

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await service.find();

        if (usuarios.length <= 0) {
            throw new CustomHttpError("No hay usuarios registrados", 404);
        }

        res.status(201).send({ usuarios: usuarios });

    } catch (e) {
        httpError(res, e);
    }
}

const listarEmpleados = async (req, res) => {
    try {
        const empleados = await service.listarEmpleados();

        if (empleados.length <= 0) {
            throw new CustomHttpError("No hay empleados registrados", 404);
        }

        res.status(201).send({ empleados: empleados });

    } catch (e) {
        httpError(res, e);
    }
}

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const usuario = await service.findOne(id_usuario);

        if (!usuario) {
            throw new CustomHttpError(`No existe un usuario con el id: ${id_usuario}`, 404);
        }

        res.status(201).send(usuario);

    } catch (e) {
        httpError(res, e);
    }
}

const obtenerEmpleadoPorId = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const usuario = await service.obtenerEmpleadoPorId(id_usuario);

        if (!usuario) {
            throw new CustomHttpError(`No existe un usuario empleado con el id: ${id_usuario}`, 404);
        }

        res.status(201).send(usuario);

    } catch (e) {
        httpError(res, e);
    }
}

const modificarUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const data = req.body;
        const rolUsuario = await service.obtenerRolEmpleadoPorId(id_usuario)
        console.log(rolUsuario)

        if (!rolUsuario) {
            throw new CustomHttpError(`No existe el usuario con el id: ${id_usuario}`, 404);
        }

        const usuarioModificado = await service.updateEmpleado(id_usuario, data);

        console.log(usuarioModificado);

        if (usuarioModificado == 0) {
            throw new CustomHttpError('Error en la modificacion del cliente');
        }

        res.status(201).send({
            mensaje: "usuario actualizado correctamente"
        });

    } catch (e) {
        httpError(res, e);
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const rolUsuario = await service.obtenerRolEmpleadoPorId(id_usuario);

        if (!rolUsuario) {
            throw new CustomHttpError(`No existe el usuario con el id: ${id_usuario}`, 404);
        }

        const usuarioEliminado = await service.delete(id_usuario);

        console.log(usuarioEliminado);

        if (usuarioEliminado == 0) {
            throw new CustomHttpError("Error en la eliminacion del usuario");
        }

        res.status(201).send({
            mensaje: "usuario eliminado correctamente"
        });

    } catch (e) {
        httpError(res, e);
    }
}


module.exports = { obtenerUsuarios, obtenerUsuarioPorId, modificarUsuario, eliminarUsuario, listarEmpleados, obtenerEmpleadoPorId };