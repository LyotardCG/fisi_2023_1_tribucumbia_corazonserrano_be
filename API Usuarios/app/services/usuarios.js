const con = require('../connection/conexion');
const CustomHttpError = require('../helpers/customHttpError');

class usuariosServices {
    constructor() {
        this.con = con;
    }

    async obtenerRolUsuarioPorId(idUsuario) {
        const query = 'select r.nombre role from usuario u inner join rol r on u.idRol = r.idRol where u.idUsuario = ?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [idUsuario],
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

    async obtenerRolEmpleadoPorId(idUsuario) {
        const query = 'select r.nombre role from empleado e inner join usuario u on e.idUsuario = u.idUsuario inner join rol r on u.idRol = r.idRol where e.idUsuario = ?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [idUsuario],
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

    async find() {
        const query = 'select u.idUsuario, u.nombres, u.apellidos, u.telefono, u.correo, r.nombre rol from usuario u inner join rol r on u.idRol = r.idRol';
        return new Promise((res, rej) => {
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

    async listarEmpleados() {
        const query = 'select e.idUsuario, u.nombres, u.apellidos, u.correo, u.telefono, s.nombre sede from usuario u inner join empleado e on u.idUsuario = e.idUsuario inner join sede s on e.idSede = s.idSede order by e.idUsuario;';
        return new Promise((res, rej) => {
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

    async findOne(id) {
        const query = 'select u.idUsuario, u.nombres, u.apellidos, u.telefono, u.correo, r.nombre rol from usuario u inner join rol r on u.idRol = r.idRol WHERE u.idUsuario =  ?';
        return new Promise((res, rej) => {
            this.con.query(query, [id],
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


    async obtenerEmpleadoPorId(id) {
        const query = 'select u.idUsuario, u.nombres, u.apellidos, u.telefono, u.correo from usuario u inner join empleado e on u.idUsuario = e.idUsuario  WHERE u.idUsuario = ?';
        return new Promise((res, rej) => {
            this.con.query(query, [id],
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

    async update(id, { nombres, apellidos, telefono} = data) {
        const query = 'update usuario set nombres = ?, apellidos = ?, telefono = ? where idUsuario = ?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [nombres, apellidos, telefono, id],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error en la actualizacion del usuario"));
                    } else {
                        res(result.affectedRows);
                    }
                }
            )
        });
    }

    async updateEmpleado(id, { nombres, apellidos, telefono, idSede, estado } = data) {
        const query = 'update empleado set idSede = ?, estado = ? where idUsuario = ?;';
        const datos = { nombres, apellidos, telefono }
        //await this.update(id, datos)

        return new Promise((res, rej) => {
            this.con.query(
                query, [idSede, estado, id],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error en la actualizacion del empleado"));
                    } else {
                        res(this.update(id, datos));
                    }
                }
            )
        });
    }

    async delete(id) {
        const query = 'delete from usuario where idUsuario = ?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [id],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error en la eliminacion del usuario"));
                    } else {
                        res(result.affectedRows);
                    }
                }
            )
        });
    }

}


module.exports = usuariosServices;