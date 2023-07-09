const { httpError } = require('../helpers/handleError');
const CustomHttpError = require('../helpers/customHttpError');
const reservacionesService = require('../services/reservaciones');
const clientesService = require('../services/clientes');
const sedesService = require('../services/sedes');
const QRCode = require("qrcode")

const serviceReservas = new reservacionesService();
const serviceClientes= new clientesService();
const serviceSedes = new sedesService();


const listarReservaciones = async (req, res) => {
    try {

        const reservaciones = await serviceReservas.find()

        if (reservaciones.length <= 0) {
            throw new CustomHttpError("No hay reservaciones registradas", 404);
        }

        res.status(200).send({ reservaciones: reservaciones })

    } catch (e) {
        httpError(res, e)
    }
}

const crearReservacion = async (req, res) => {
    try {

        const data = req.body
        //const idCliente = req.tokenData.id
        //console.log(idCliente)

        const nuevaReservacion = await serviceReservas.create(data)

        if(nuevaReservacion <= 0) {
            throw new CustomHttpError("Error en la creacion de la reserva");
        }
        //console.log(nuevaReservacion)

        const qrCode = await QRCode.toDataURL(nuevaReservacion.toString())
        await serviceReservas.addQR(nuevaReservacion, qrCode)

        res.status(201).send({
            mensaje: "Reserva creada correctamente",
            id: nuevaReservacion,
            qr: qrCode
        })

    } catch (e) {
        //httpError(res, e)
        res.send({ error: e.message})
    }
}

const obtenerReservasSede = async (req, res) => {
    try {

        const id_sede = req.params.id_sede
        const sede = await serviceSedes.findOne(id_sede)

        if (!sede) {
            throw new CustomHttpError(`No existe la sede con el id: ${id_sede}`, 404)
        }

        const reservacionesSede = await serviceReservas.reservacionesPorSede(id_sede)

        if (reservacionesSede.length <= 0) {
            throw new CustomHttpError(`No existen reservaciones en la sede con el id: ${id_sede}`, 404)
        }

        res.status(200).send({ reservas: reservacionesSede })

    } catch (e) {
        httpError(res, e)
    }
}

const obtenerReservasCliente = async (req,res)=>{
    const {id_cliente}=req.params;
    try {

        const cliente = await serviceClientes.findOne(id_cliente);

        if (cliente.length<=0) {
            throw new CustomHttpError(`No existe un cliente con el id: ${id_cliente}`, 404)
        };

        const reservasCliente = await serviceReservas.obtenerReservasCLiente(id_cliente);

        if (reservasCliente.length <= 0) {
            throw new CustomHttpError(`No hay reservas registradas para el cliente con el id: ${id_cliente}`, 404);
        };

        reservasCliente.forEach(reserva => {
            //console.log(reserva.QR)
            const qr = (reserva.QR) ? reserva.QR : 1
            reserva.QR = qr.toString()
        });

        res.status(200).send({ reservas: reservasCliente });
        
    } catch (e) {
        httpError(res, e);
    }
};

const obtenerReservaPorId = async (req,res)=>{
    try {
        const {id_reservacion}=req.params;
        const reserva = await serviceReservas.obtenerReservaPorId(id_reservacion);

        if(reserva.length<=0){
            throw new CustomHttpError(`No existe una reservación con el id: ${id_reservacion}`, 404)
        };

        const qr = (reserva[0].QR) ? reserva[0].QR : 1
        reserva[0].QR = qr.toString()
        
        res.status(200).send({ reserva: reserva[0] });
    } catch (e) {
        httpError(res, e);
    };
}

const atenderReserva=async (req,res)=>{
    try {
        const {id_reservacion}=req.params;
        const reserva = await serviceReservas.obtenerReservaPorId(id_reservacion);
        if(reserva.length<=0){
            throw new CustomHttpError(`No existe una reservación con el id: ${id_reservacion}`, 404)
        };
        await serviceReservas.atenderReserva(id_reservacion);
        res.status(200).send({ mensaje: "Reservación atendida" });
    } catch (e) {
        httpError(res, e);
    }
};

const actualizarReserva = async (req, res) => {
    try {
        const id_reservacion = req.params.id_reservacion
        const {horario, numeroMesa, numeroSillas} = req.body

        const reservaModificada = await serviceReservas.update(id_reservacion, horario, numeroMesa, numeroSillas)

        if (reservaModificada == 0) {
            throw new CustomHttpError('Error en la modificacion de la reservacion')
        }

        res.status(200).send({ mensaje: "Reservacion modificada correctamente" })

    } catch (e) {
        httpError(res, e)
    }
}

const eliminarReserva = async (req, res) => {
    try {
        const id_reservacion = req.params.id_reservacion
        const {idCliente} = req.body

        const reservacionCliente = await serviceReservas.validarReservaCliente(idCliente, id_reservacion)

        if (reservacionCliente.length == 0) {
            throw new CustomHttpError(`No existe una reservación con el id ${id_reservacion} asociada al cliente.`, 404)
        }

        const reservacionEliminada = await serviceReservas.delete(id_reservacion)

        if (reservacionEliminada == 0) {
            throw new CustomHttpError('Error en la eliminacion de la reservacion')
        }

        res.status(200).send({ mensaje: 'Reservacion eliminada correctamente' })

    } catch (e) {
        httpError(res, e)
    }
}

const verificarReserva = async (req, res) => {
    try {
        const id_reservacion = req.params.id_reservacion;
        
        const reserva = await serviceReservas.obtenerReservaPorId(id_reservacion);
        
        if(reserva.length<=0){
            throw new CustomHttpError(`No existe una reservación con el id: ${id_reservacion}`, 404)
        };
        const qr = reserva[0].QR
        reserva[0].QR = qr.toString()

        res.status(200).send({ reserva: reserva[0] });

    } catch (e) {
        httpError(res, e);
    }
}

module.exports = {
  listarReservaciones,
  crearReservacion,
  obtenerReservasSede,
  obtenerReservasCliente,
  obtenerReservaPorId,
  atenderReserva,
  actualizarReserva,
  eliminarReserva,
  verificarReserva
};