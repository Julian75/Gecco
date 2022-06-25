const expresss = require('express');
const app = expresss();

const {loginCtrl, registerCtrl} = require('../Controllers/verificacion')

let envio = require('../Controllers/correoController'); /*la ruta */

app.post('/envio',envio.envioCorreo) /*Nuestro verbo con la ruta
cuando la ruta sea posteada ejecute la funcion de controler*/
app.post('/login', loginCtrl)
app.post('/register', registerCtrl)

module.exports=app;
