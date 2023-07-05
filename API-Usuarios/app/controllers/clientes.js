const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const clientesService = require('../services/clientes');

const service = new clientesService();


const obtenerClientes = async (req, res) => {
    try {
        
        const clientes = await service.find();

        if (clientes.length <= 0) {
            throw new CustomHttpError("No hay clientes registrados", 404);
        }

        res.status(200).send({ clientes: clientes });

    } catch (e) {
        httpError(res, e);
    }
}

const obtenerClientePorId = async (req, res) => {
    try {

        const idCliente = req.params.idCliente
        const cliente = await service.findOne(idCliente)

        if (!cliente) {
            throw new CustomHttpError(`No existe un usuario con el id: ${idCliente}`, 404)
        }

        res.status(200).send(cliente);

    } catch (e) {
        httpError(res, e);
    }
}

const modificarCliente = async (req, res) => {
    try {

        const idCliente = req.params.idCliente;
        const data = req.body;
        const rolUsuario = await service.obtenerRolClientePorId(idCliente);

        if (!rolUsuario) {
            throw new CustomHttpError(`No existe el cliente con el id: ${idCliente}`, 404);
        }

        const clienteModificado = await service.update(idCliente, data);
        
        if (clienteModificado == 0) {
            throw new CustomHttpError('Error en la modificacion del cliente');
        }

        res.status(200).send({ mensaje: 'Cliente actualizado correctamente' })

    } catch (e) {
        httpError(res, e);
    }
}

const eliminarCliente = async (req, res) => {
    try {

        const idCliente = req.params.idCliente;
        const rolUsuario = await service.obtenerRolClientePorId(idCliente);

        if (!rolUsuario) {
            throw new CustomHttpError(`No existe el cliente con el id: ${idCliente}`, 404);
        }

        const clienteEliminado = await service.delete(idCliente);

        if (clienteEliminado == 0) {
            throw new CustomHttpError("Error en la eliminacion del cliente");
        }

        res.status(200).send({ mensaje: 'cliente eliminado correctamente' });

    } catch (e) {
        httpError(res, e);
    }
}


module.exports = { obtenerClientes, obtenerClientePorId, modificarCliente, eliminarCliente };