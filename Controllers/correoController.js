const { request,response } = require('express')
const nodemailer = require('nodemailer')

/*funcion para enviar correo*/

/*
*/const envioCorreo = (req=request,resp=response) => {
    let body = req.body
    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth:{
            user: 'gokut777@gmail.com',
            pass: 'nbkmejoeqnmlnksd',
        }

    })
    const opciones ={
        from: 'SuChance', /*de*/
        subject: body.asunto, /*asunto*/
        to: body.email, /*email a enviar*/
        html: body.mensaje, /** texto plano o se puede agrear otra cosa formato html */
        // attachments: [
        //     {
        //         filename: 'Comprobante.png',
        //         path: body.imagen,
        //     }
        // ]
    }
    config.sendMail(opciones,function(error,result){

        if (error) return resp.json({ok:false, msg:error})

        return resp.json({
            ok: true,
            msg: result
        })
    })

}

module.exports ={
    envioCorreo
}
