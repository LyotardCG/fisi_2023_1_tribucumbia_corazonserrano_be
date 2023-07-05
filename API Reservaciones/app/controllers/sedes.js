const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const sedesService = require('../services/sedes.js');

const service = new sedesService();


const obtenerSedes = async (req, res) => {
    try {

        const sedes = await service.find();

        if (sedes.length <= 0) {
            throw new CustomHttpError("No hay sedes registradas", 404);
        }

        res.status(200).send({ sedes: sedes })

    } catch (e) {
        httpError(res, e);
    }
}

const obtenerSedePorId = async (req, res) => {
    try {

        const id_sede = req.params.id_sede
        const sede = await service.findOne(id_sede)

        if(!sede) {
            throw new CustomHttpError(`No existe la sede con el id: ${id_sede}`, 404)
        }

        res.status(200).send(sede)

    } catch (e) {
        httpError(res, e)
    }
}


module.exports = { obtenerSedes, obtenerSedePorId };