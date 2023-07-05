const crypto = require('crypto');

//TODO: Encriptamos!!
const encrypt = async (textPlain) => { //TODO: 123456
    const hash = crypto.createHash('sha256').update(textPlain).digest('hex'); //0404o4ofoto4o
    return hash
}

//TODO: Comparamos!!
const compare = async (passwordPlain, hashPassword) => {
    hashPasswordPlain = await encrypt(passwordPlain);

    return hashPasswordPlain === hashPassword
}

module.exports = { encrypt, compare }