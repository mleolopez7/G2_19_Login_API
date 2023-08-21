'use strict'
// usuario-model.js

//var db = require('../config/db');

//var UsuarioModel = {};



//const jwt = require('jsonwebtoken');

var conn = require("../config/db-connection"),
    UsuarioModel = () => {};


    // Nueva función para verificar las credenciales del usuario
UsuarioModel.login = (codigo_usuario, contra, callback) => {
    const query = 'SELECT * FROM usuario WHERE codigo_usuario = ? AND contra = ?';
    db.query(query, [codigo_usuario, contra], callback);
};
    
UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM usuario", cb);

UsuarioModel.post = (data, cb) => 
    conn.query("call public.sp_usuario_insert ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    [
        data.codigo_usuario,
        data.nombre,
        data.apellido,
        data.contra,
        data.email,
        data.estado,
        data.ultimo_ingreso,
        data.expira_pass,
        data.dias_caducidad_pass,
        data.rol,
        data.intentos_incorrectos,
        data.fecha_registro
    ],cb);

module.exports = UsuarioModel;