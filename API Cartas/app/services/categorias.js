const con = require('../conexion/conexion.js');
const CustomHttpError = require('../helpers/customHttpError');

class CategoriasServices{
    constructor(){
        this.con = con;
    }
    async obtenerCategorias(){
        const query = 'select idCategoria, nombre from categoria;';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        rej(new CustomHttpError("Error en la consulta"));
                    }
                   
                }
            );
        });
    }
}

module.exports = CategoriasServices;