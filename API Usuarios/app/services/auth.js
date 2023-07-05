const con = require('../connection/conexion');
const CustomHttpError = require('../helpers/customHttpError');

class authServices {
    constructor() {
        this.con = con;
    }

    async crearUsuario(correo, password, nombres, apellidos, telefono, idRol) {
        const query = 'insert into usuario (idRol, nombres, apellidos, telefono, correo, password) values (?,?,?,?,?,?);';

        return new Promise((res, rej) => {
            this.con.query(
                query, [idRol, nombres, apellidos, telefono, correo, password],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error en la creacion del usuario"));
                    } else {
                        res(result.insertId);
                    }
                }
            )
        });
    }

    async crearEmpleado({ correo, password, nombres, apellidos, telefono, idRol, idSede } = data) {
        const query = 'insert into empleado values (?,?,1);';
        const insertId = await this.crearUsuario(correo, password, nombres, apellidos, telefono, idRol);

        return new Promise((res, rej) => {
            this.con.query(
                query, [insertId, idSede],
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la creacion del empleado"));
                    } else {
                        res(true);
                    }
                }
            )
        });
    }

    async crearCliente({ correo, password, nombres, apellidos, telefono, idRol, dni } = data) {
        const query = 'insert into cliente values (?,?);';
        const insertId = await this.crearUsuario(correo, password, nombres, apellidos, telefono, idRol);

        return new Promise((res, rej) => {
            this.con.query(
                query, [insertId, dni],
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la creacion del cliente"));
                    } else {
                        res(true);
                    }
                }
            )
        });
    }

    async obtenerClientePorDni(dni) {
        const query = 'select c.idUsuario, c.dni, u.nombres, u.apellidos, u.telefono, u.correo, r.nombre rol from cliente c inner join usuario u on c.idUsuario = u.idUsuario inner join rol r on u.idRol = r.idRol where c.dni=?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [dni],
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

    async obtenerUsuarioPorCorreo(correo) {
        const query = 'select u.idUsuario, u.password, r.nombre rol from usuario u inner join rol r on u.idRol = r.idRol where u.correo = ?;';

        return new Promise((res, rej) => {
            this.con.query(
                query, [correo],
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

}

module.exports = authServices;