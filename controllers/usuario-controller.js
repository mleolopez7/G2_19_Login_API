'use strict'

//CONTROL GET ALL
var UsuarioModel = require('../models/usuario-model'),
UsuarioController = () => {}

UsuarioController.getAll = (req, res, next) => {
    UsuarioModel.getAll((err, rows) => { 
        if (err)
        {
            let locals = {
                title : 'Error al consultar la base de datos',
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.render('error', locals)
        }
        else
        {
            let locals = {
                title : 'Lista de los Usuarios',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
    UsuarioModel.use = req
}

//CONTROL INSERTAR NUEVO USUARIO
UsuarioController.post = (req, res, next) => {
    let usuario = {
        codigo_usuario : req.body.codigo_usuario,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        contra : req.body.contra,
        email : req.body.email,
        estado : req.body.estado,
        ultimo_ingreso : req.body.ultimo_ingreso,
        expira_pass : req.body.expira_pass,
        dias_caducidad_pass : req.body.dias_caducidad_pass,
        rol : req.body.rol,
        intentos_incorrectos : req.body.intentos_incorrectos,
        fecha_registro : req.body.fecha_registro
    }
    console.log(usuario)

    UsuarioModel.post(usuario, (err) => {
        if (err)
        {
            let locals = {
                title :  `Error al guardar el registro con el id: ${usuario.codigo_usuario}`,
                description : 'Error de Sintaxis SQL',
                error : err
            }
            res.status(520).send(err)
        }else{
            res.send('El Usuario se ha ingresado correctamente')
        }
    })
}

module.exports = UsuarioController;