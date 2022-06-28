const expresss = require('express');
const app = expresss();

let envio = require('../Controllers/correoController'); /*la ruta */

app.post('/envio',envio.envioCorreo); /*Nuestro verbo con la ruta
cuando la ruta sea posteada ejecute la funcion de controler*/

module.exports=app;
