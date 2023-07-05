const con = require('../connection/conexion');
const CustomHttpError = require('../helpers/customHttpError');

class sedesServices{
    constructor(){
        this.con = con;
    }

    async find(){
        const query = 'SELECT idSede, nombre, direccion FROM sede;';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"));
                    } else {
                        res(datos);
                    }
                }
            );
        });
    }

    async findOne(idSede){
        const query = 'SELECT idSede, nombre, direccion FROM sede where idSede = ?;';
        return new Promise((res, rej) =>{
            this.con.query(
                query, [idSede],
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"));
                    } else {
                        res(datos[0]);
                    }
                }
            );
        });
    }

}


module.exports = sedesServices;