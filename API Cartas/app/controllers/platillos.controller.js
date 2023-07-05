const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const platillosService = require('../services/platillos');

const servicePlatillos = new platillosService();

const obtenerPlatillos = async (req,res)=>{
    try {
        const platillos = await servicePlatillos.obtenerPLatillos();
        

        if (platillos.length <= 0) {
            throw new CustomHttpError(`No hay platillos registrados`, 404);
        };

        res.status(200).send({ platillos: platillos });
        
    } catch (e) {
        httpError(res, e);
    }
};
const obtenerPlatilloPorId = async (req,res)=>{
    try {
        const {idPlatillo}=req.params;
        const platillo = await servicePlatillos.obtenerPlatilloPorId(idPlatillo);
        if(platillo.length<=0){
            throw new CustomHttpError(`El platillo con id: ${idPlatillo} no esta registrado`, 404);
        };
        res.status(200).send({ platillo: platillo });
        
    } catch (e) {
        httpError(res, e);
    }
}

module.exports = { obtenerPlatillos,obtenerPlatilloPorId};
