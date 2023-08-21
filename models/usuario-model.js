'use strict'
// usuario-model.js

//var db = require('../config/db');

//var UsuarioModel = {};



//const jwt = require('jsonwebtoken');

var conn = require("../config/db-connection");

var UsuarioModel = {};
UsuarioModel.login = async (codigo_usuario, contra) => {
  try {
    const query =
      "SELECT * FROM Usuario WHERE codigo_usuario = $1 AND contra = $2";
    const values = [codigo_usuario, contra];

    const client = await conn.getClient();

    const result = await client.query(query, values);

    client.release();

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
    // Nueva función para verificar las credenciales del usuario
UsuarioModel.getOne = (codigo_usuario ,cb) => 
    conn.query(
        "Select * From usuario where codigo_usuario = $1", [codigo_usuario], cb);

    
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