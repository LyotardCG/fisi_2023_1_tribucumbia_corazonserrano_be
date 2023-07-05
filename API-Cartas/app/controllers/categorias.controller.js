const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const categoriasService = require('../services/categorias');

const serviceCategorias = new categoriasService();

const obtenerCategorias = async (req,res)=>{
    try {
        const categorias = await serviceCategorias.obtenerCategorias();
        

        if (categorias.length <= 0) {
            throw new CustomHttpError(`No hay categorias registradas`, 404);
        };

        res.status(200).send({ categorias: categorias });
        
    } catch (e) {
        httpError(res, e);
    }
};


module.exports = { obtenerCategorias};
