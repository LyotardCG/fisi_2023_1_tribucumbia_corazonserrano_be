const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');


router.post('/login', login);

router.post('/registrar-usuarios', register);


module.exports = router;