const con = require('../conexion/conexion.js');
const CustomHttpError = require('../helpers/customHttpError');

class reservasServices{
    constructor(){
        this.con = con;
    }


    async reservarCarta(data) {
        const query = 'INSERT INTO reservacion_platillo (idReservacion, idPlatillo, cantidad) VALUES (?,?,?);';
      
        return new Promise((resolve, reject) => {
          const promises = data.platillos.map(platillo => { 
            return new Promise((res, rej) => {
              this.con.query(query, [data.idReservacion, platillo.idPlatillo, platillo.cantidad], (error, data) => { 
                if (!error) {
                  res(true);
                } else {
                  rej(new CustomHttpError("Error en la consulta"));
                }
              });
            });
          });
      
          Promise.all(promises)
            .then(results => {
                resolve("Reserva de carta realizada con éxito.");
            })
            .catch(error => {
              reject(error);
            });
        });
      }

    async obtenerReservaPorId(id){
        const query = 'SELECT r.idReservacion,r.numero_sillas,r.atendido,s.nombre as sede,s.direccion,r.horario,r.numero_mesa,r.QR FROM reservacion as r INNER JOIN sede as s ON r.idSede = s.idSede WHERE r.idReservacion = ?;';
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

 

    async atenderReserva(id){
        const query = 'UPDATE reservacion SET atendido = 1 WHERE idReservacion = ?;'
        return new Promise((res, rej) =>{
            this.con.query(query,[id],(error, data) =>{
                    if(!error) res(true);
                    else  rej(new CustomHttpError("Error en la consulta"));
                });
        });
    }

    
    async obtenerReservaCartaPorId(id){
        const query = 'SELECT rp.idPlatillo, p.nombre,p.precio,p.foto,rp.cantidad FROM reservacion_platillo AS rp INNER JOIN platillo AS p ON rp.idPlatillo = p.idPlatillo WHERE idReservacion = ?;';
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

}


module.exports = reservasServices;