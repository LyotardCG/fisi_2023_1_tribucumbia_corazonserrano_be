const { httpError } = require('../helpers/handleError');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/generateToken');
const authServices = require('../services/auth');
const CustomHttpError = require('../helpers/customHttpError');

const service = new authServices();

const login = async (req, res) => {
  try {

    const { correo, password } = req.body;

    const user = await service.obtenerUsuarioPorCorreo(correo);

    if (!user) {
      throw new CustomHttpError(`No existe el usuario con correo: ${correo}`, 404);
    }

    const checkPassword = await compare(password, user.password);

    //TODO JWT
    const tokenSession = await tokenSign(user);

    if (!checkPassword) {
      // Contraseña incorrecta
      throw new CustomHttpError("Unauthorized: Invalid password", 401);
    }

    // Contraseña es correcta!
    res.send({
      data: user,
      tokenSession,
    });
    return;

  } catch (e) {
    httpError(res, e);
  }
};

const register = async (req, res) => {
  try {

    const data = req.body

    const passwordHash = await encrypt(data.password)
    data.password = passwordHash
    
    let usuario = await service.obtenerUsuarioPorCorreo(data.correo)

    if (usuario) {
      throw new CustomHttpError(`Ya existe un usuario con el correo: ${data.correo}`, 400);
    }

    if (data.idRol === 3) {
      await registrarCliente(data)
    } else {
      await registrarEmpleado(data)
    }

    res.status(201).json({
      mensaje: "usuario creado correctamente"
    });

  } catch (e) {
    httpError(res, e)
  }
}

const registrarCliente = async (data) => {

    usuario = await service.obtenerClientePorDni(data.dni)
      
    if (usuario) {
      throw new CustomHttpError(`Ya existe un usuario con el dni: ${data.dni}`, 400);
    }
   
    await service.crearCliente(data);
}

const registrarEmpleado = async (data) => {
    await service.crearEmpleado(data);
}


module.exports = { login, register };