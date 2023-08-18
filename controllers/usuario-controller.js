'use strict'
//const jwt = require('jsonwebtoken');

//CONTROL LOGIN
//UsuarioController.login = (req, res, next) => {
//    const { codigo_usuario, password } = req.body;
//    if (validarCredenciales(codigo_usuario, password)) {
//        const token = jwt.sign({ codigo_usuario }, 'secreto', { expiresIn: '1h' });
//        res.status(200).json({ token });
//    } else {
//        res.status(401).json({ mensaje: 'Credenciales inválidas' });
//    }
//};

// Función para validar las credenciales (simulación)
//function validarCredenciales(codigo_usuario, password) {
    // Aquí debes implementar la lógica de validación con tu modelo de usuario
    // Por ejemplo, consultar la base de datos y comparar las credenciales
    // Retornar true si las credenciales son válidas, o false si no lo son
//    return codigo_usuario === 'usuario' && password === 'contraseña';
//}

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
        password : req.body.password,
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