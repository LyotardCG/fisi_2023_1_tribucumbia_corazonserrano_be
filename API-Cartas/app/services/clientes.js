const con = require('../conexion/conexion.js');
const CustomHttpError = require('../helpers/customHttpError');

class clientesServices{
    constructor(){
        this.con = con;
    }
    async findOne(id){
        const query = 'select u.nombres, u.apellidos, c.dni, u.correo, u.telefono from usuario u inner join cliente c on u.idUsuario = c.idUsuario where c.idUsuario = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
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


module.exports = clientesServices;
