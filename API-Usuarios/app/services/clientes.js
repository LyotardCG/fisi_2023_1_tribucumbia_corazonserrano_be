const con = require('../connection/conexion');
const CustomHttpError = require('../helpers/customHttpError');

class clientesServices{
    constructor(){
        this.con = con;
    }

    async obtenerRolClientePorId(idCliente) {
        const query = 'select r.nombre role from cliente c inner join usuario u on c.idUsuario = u.idUsuario inner join rol r on u.idRol = r.idRol where c.idUsuario = ?;';


        return new Promise((res, rej) => {
            this.con.query(
                query, [idCliente],
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"));
                    } else {
                        res(datos[0]);
                    }
                }
            )
        }); 
    }

    async find(){
        const query = 'select c.idUsuario, u.nombres, u.apellidos, c.dni, u.correo, u.telefono from usuario u inner join cliente c on u.idUsuario = c.idUsuario;';
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"));
                    } else {
                        res(datos);
                    }
                }
            );
        });
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

    async update(idUsuario, { nombres, apellidos, telefono, dni } = data){
        const query1 = 'UPDATE cliente SET dni = ? WHERE idUsuario = ?;'
        const query2 = 'UPDATE usuario SET nombres = ?, apellidos = ?, telefono = ? WHERE idUsuario = ?'

        return new Promise((res, rej) =>{
            this.con.query(
                query1,[dni, idUsuario],
                (error, data) =>{
                    if(error) {
                        rej(new CustomHttpError("Error en la actualizacion del cliente"));
                    } else {
                        this.con.query(
                            query2, [nombres, apellidos, telefono, idUsuario],
                            (error, result) => {
                                if (error) {
                                    rej(new CustomHttpError("Error en la actualizacion del cliente"));
                                } else {
                                    res(result.affectedRows);
                                }
                            }
                        );
                    }                   
                }    
            );
        });
    }

    async delete(id){
        const query = 'delete from usuario where idUsuario = ?;';

        return new Promise((res, rej) =>{
            this.con.query(
                query,[id],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error en la eliminacion del cliente"));
                    } else {
                        res(result.affectedRows);
                    }
                }
            );
        });
    }

}


module.exports = clientesServices;