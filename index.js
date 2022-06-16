const express = require('express')
const app = express()
let cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(require('./routes/correoRoutes'))


app.listen('3500',()=>{
    console.log('Server corriendo en el puerto 3500')
})


