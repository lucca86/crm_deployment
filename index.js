const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

/** Importar CORS
 * CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos    
 */

 const cors = require('cors');

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Crear el servidor
const app = express();

// Habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // Revisar si la petición viene de un servidor que está en la whitelist
        const existe = whitelist.some( dominio => dominio === origin);
        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Habilitar CORS
app.use(cors());

// Rutas de la app
app.use('/', routes());

// Carpeta Pública
app.use(express.static('uploads'));

// HOST and PORT
const host = process.env.HOST || '0.0.0.0'; 
const port = process.env.PORT || 5000;

// Iniciar app
app.listen(port, host, () => {
    console.log('El servidor está funcionando...');
    
})

