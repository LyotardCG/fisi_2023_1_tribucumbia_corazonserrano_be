const con = require('../conexion/conexion.js');
const CustomHttpError = require('../helpers/customHttpError');

class platillosServices{
    constructor(){
        this.con = con;
    }

   
    async obtenerPLatillos(){
        const query = 'SELECT p.idPlatillo, p.nombre, p.descripcion, p.precio, p.foto, p.idCategoria, c.nombre as categoria FROM platillo as p INNER JOIN categoria as c ON p.idCategoria = c.idCategoria;';
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

    async obtenerPlatilloPorId(id){
        const query = 'SELECT p.idPlatillo, p.nombre, p.descripcion, p.precio, p.foto, p.idCategoria, c.nombre as categoria FROM platillo as p INNER JOIN categoria as c ON p.idCategoria = c.idCategoria WHERE p.idPlatillo =  ?';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if(!error){
                        res(datos);
                    }else{
                        rej(new CustomHttpError("Error en la consulta"));
                    }
                    
                }
            );
        });
    };
}


module.exports = platillosServices;