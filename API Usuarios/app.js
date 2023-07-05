require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const api = require("./app/routes");
const cors = require('cors');

const app = express();
/* seteamos la puerta */
app.set('port', process.env.PORT || 9000);

/* ruta principal */
app.get('/', (req, res) => {
    res.send('Bienvenido a la API Usuarios');
})

const whitelist = [
    'http://localhost:3000',
    'http://localhost:9000',
    'https://myapp.com'
]

const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}

app.use(cors(options));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* usamos las rutas */
api(app);

/* escucha por el puerto */
app.listen(app.get('port'), () => {
    console.log('servidor ejecutandose en el puerto', app.get('port'));
})

