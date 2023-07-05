const con = require('../connection/conexion');
const CustomHttpError = require('../helpers/customHttpError');

class reservacionesServices{
    constructor(){
        this.con = con;
    }

    async create({ idCliente, idSede, numeroMesa, numeroSillas, horario } = data){
        const query = 'INSERT INTO reservacion(idUsuario, idSede , numero_mesa, numero_sillas, atendido, horario) VALUES (?,?,?,?,0,?);'
        
        return new Promise((res, rej) =>{
            this.con.query(
                query,[idCliente, idSede, numeroMesa, numeroSillas, horario],
                (error, result) =>{
                    if(error){
                        console.log(error)
                        rej(new CustomHttpError("Error en la creacion de la reserva"));
                    }else{
                        res(result.insertId);
                    }  
                }
            );
        });        
    }

    async find(){
        const query = "select r.idReservacion, CONCAT(u.nombres,', ',u.apellidos) usuario, s.nombre sede, r.numero_mesa, r.numero_sillas, DATE_FORMAT(r.horario, '%Y-%m-%d %H:%i:%s') horario, r.atendido from reservacion r inner join sede s on r.idSede = s.idSede inner join usuario u on r.idUsuario = u.idUsuario;";
        return new Promise((res, rej) =>{
            this.con.query(query,
                (error, datos) =>{
                    if(error){
                        rej(new CustomHttpError("Error en la consulta"));
                    }else{
                        res(datos);
                    }
                    
                }
            );
        });
    }

    async obtenerReservaPorId(id){
        const query = "SELECT r.idReservacion, CONCAT(u.nombres,', ',u.apellidos) usuario, r.numero_sillas, r.atendido, s.nombre as sede, s.direccion, DATE_FORMAT(r.horario, '%Y-%m-%d %H:%i:%s') horario, r.numero_mesa, CONCAT(r.QR,'') QR FROM reservacion as r INNER JOIN sede as s ON r.idSede = s.idSede inner join usuario u on r.idUsuario = u.idUsuario WHERE r.idReservacion = ?;";
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
    }

    async obtenerReservasCLiente(id){
        const query = 'SELECT r.idReservacion,r.numero_mesa,r.numero_sillas,r.horario,r.atendido,r.QR,s.nombre,s.direccion FROM reservacion as r INNER JOIN sede as s ON r.IdSede=s.idSede WHERE idUsuario = ?;';
        return new Promise((res, rej) =>{
            this.con.query(query,[id],
                (error, datos) =>{
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"));
                    } else {
                        res(datos);
                    }
                    
                }
            );
        });
    };

    async reservacionesPorSede(id){
        const query = "select r.idReservacion, CONCAT(u.nombres,', ',u.apellidos) usuario, r.numero_mesa, r.numero_sillas, r.horario, r.atendido from reservacion r inner join usuario u on r.idUsuario = u.idUsuario where r.idSede = ?;";
        return new Promise((res, rej) =>{
            this.con.query(
                query,[id],
                (error, datos) =>{
                    if(error){
                        rej(new CustomHttpError("Error en la consulta"));
                    }else{
                        res(datos);
                    } 
                }
            );
        });
    }


    async atenderReserva(id){
        const query = 'UPDATE reservacion SET atendido = 1 WHERE idReservacion = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[id],(error, data) =>{
                    if(!error) res(true);
                    else  rej(new CustomHttpError("Error en la consulta"));
                });
        });
    }

    async update(id, horario, numeroMesa, numeroSillas){
        const query = 'update reservacion set horario = ?, numero_mesa = ?, numero_sillas = ? where idReservacion = ?;'
    
        return new Promise((res, rej) => {
            this.con.query(
                query, [horario, numeroMesa, numeroSillas, id],
                (error, result) => {
                    if(error) {
                        console.log(error)
                        rej(new CustomHttpError("Error en la actualizacion de la reservacion"))
                    } else {
                        res(result.affectedRows);
                    }
                }
            )
        })
    }

    async validarReservaCliente(idCliente, idReservacion) {
        const query = 'SELECT * FROM RESERVACION WHERE idUsuario = ? AND idReservacion = ?;'

        return new Promise((res, rej) => {
            this.con.query(
                query, [idCliente, idReservacion],
                (error, datos) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la consulta"))
                    } else {
                        res(datos)
                    }
                }
            )
        })
    }

    async delete(idReservacion){
        const query = 'delete from reservacion where idReservacion = ?;'

        return new Promise((res, rej) => {
            this.con.query(
                query, [idReservacion],
                (error, result) => {
                    if (error) {
                        rej(new CustomHttpError("Error en la eliminacion de la reservacion"))
                    } else {
                        res(result.affectedRows)
                    }
                }
            )
        })
    }

    async addQR(id, qrCode) {
        const query = 'update reservacion set QR = ? where idReservacion = ?;'

        return new Promise((res, rej) => {
            this.con.query(
                query, [qrCode, id],
                (error, result) => {
                    if(error) {
                        rej(new CustomHttpError("Error al agregar el QR en la reservacion"))
                    } else {
                        res(result.affectedRows)
                    }
                }
            )
        })
    }

}


module.exports = reservacionesServices;