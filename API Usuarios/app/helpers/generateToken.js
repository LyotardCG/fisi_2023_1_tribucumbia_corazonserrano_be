const jwt = require('jsonwebtoken');

const tokenSign = async (user) => { // Generar token
    return jwt.sign(
        {
            id: user.idUsuario,
            role: user.rol,
            exp: Date.now() + 60 * 15 * 1000
        },
        process.env.JWT_SECRET,
        {}
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { // Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}


module.exports = { tokenSign, decodeSign, verifyToken }