const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const reservasService = require('../services/reservas');
const clientesService = require('../services/clientes');
const platillosService = require('../services/platillos');

const serviceReservas = new reservasService();
const serviceClientes= new clientesService();
const servicePlatillos = new platillosService();


// const obtenerReservasCliente = async (req,res)=>{
//     const {idCliente}=req.params;
//     try {
//         const cliente = await serviceClientes.findOne(idCliente);
//         if (cliente.length<=0) {
//             throw new CustomHttpError(`No existe un cliente con el id: ${idCliente}`, 404)
//         };
//         const reservasCliente = await serviceReservas.obtenerReservasCLiente(idCliente);

//         if (reservasCliente.length <= 0) {
//             throw new CustomHttpError(`No hay reservas registradas para el cliente con el id: ${idCliente}`, 404);
//         };

//         res.status(200).send({ reservas: reservasCliente });
        
//     } catch (e) {
//         httpError(res, e);
//     }
// };

const reservarCarta = async (req,res)=>{
    try {
        const data=req.body;
        if(!data.idReservacion || data.platillos<=0 || !data.platillos){
            throw new CustomHttpError(`Solicitud incorrecta, faltan datos`, 400);
        };
        const reserva = await serviceReservas.obtenerReservaPorId(data.idReservacion);
        if(reserva.length<=0){
            throw new CustomHttpError(`No existe una reservación con el id: ${data.idReservacion}`, 404);
        };
        const reservaCarta =  await serviceReservas.obtenerReservaCartaPorId(data.idReservacion);
        if(!reservaCarta.length<=0){
            throw new CustomHttpError(`Usted ya realizo la reserva de su carta para la reservacion con id: ${data.idReservacion}`, 400);
        };

        const verificarPlatillos = await Promise.all(data.platillos.map(async (platillo) => {
            const existePlatillo = await servicePlatillos.obtenerPlatilloPorId(platillo.idPlatillo);
            return existePlatillo.length>0;
          }));
        const todosPlatillosExistentes = verificarPlatillos.every((existe) => existe);
        if(!todosPlatillosExistentes){
           throw new CustomHttpError(`Uno o más platillos no estan registrados`, 404);
        };

        const carta = await serviceReservas.reservarCarta(data);
        res.status(200).send({ mensaje: carta });
        
    } catch (e) {
        httpError(res, e);
    };
};

// const obtenerReservaPorId = async (req,res)=>{
//     try {
//         const {idReservacion}=req.params;
//         const reserva = await serviceReservas.obtenerReservaPorId(idReservacion);
//         if(reserva.length<=0){
//             throw new CustomHttpError(`No existe una reservación con el id: ${idReservacion}`, 404)
//         };
//         res.status(200).send({ reserva: reserva });
//     } catch (e) {
//         httpError(res, e);
//     };
// }

const obtenerReservaCartaPorId = async (req,res)=>{
    try {
        const {idReservacion}=req.params;
        const reservaCarta = await serviceReservas.obtenerReservaCartaPorId(idReservacion);
        if(reservaCarta.length<=0){
            throw new CustomHttpError(`No existe una reserva de carta con el id: ${idReservacion}`, 404)
        };
        res.status(200).send({ reserva: reservaCarta });
        
    } catch (e) {
        httpError(res, e);
    };
};

// const atenderReserva=async (req,res)=>{
//     try {
//         const {idReservacion}=req.params;
//         const reserva = await serviceReservas.obtenerReservaPorId(idReservacion);
//         if(reserva.length<=0){
//             throw new CustomHttpError(`No existe una reservación con el id: ${idReservacion}`, 404)
//         };
//         await serviceReservas.atenderReserva(idReservacion);
//         res.status(200).send({ mensaje: "Reservación atendida" });
//     } catch (e) {
//         httpError(res, e);
//     }
// };



module.exports = {
//   obtenerReservasCliente,
  reservarCarta,
  obtenerReservaCartaPorId,
//   obtenerReservaPorId,
//   atenderReserva,
};
