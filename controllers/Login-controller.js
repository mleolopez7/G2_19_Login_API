"use strict";

var conn = require("../config/db-connection");

var LoginController = {};

LoginController.login = (req, res, next) => {
  var { codigo_usuario, contra } = req.body;

  conn.query(
    "SELECT * FROM usuario WHERE codigo_usuario = $1",
    [codigo_usuario],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error en el servidor" }); 
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Usuario no encontrado" }); 
      }


      if (result.rows[0].contra !== contra) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      var userData = {
        codigo_usuario: result.rows[0].codigo_usuario,
        nombre: result.rows[0].nombre,
        apellido: result.rows[0].apellido,
        contra: result.rows[0].contra,
        email:result.rows[0].email,
        estado:result.rows[0].estado,
        ultimo_ingreso:result.rows[0].ultimo_ingreso,
        expira_pass:result.rows[0].expira_pass,
        dias_caducidad_pass:result.rows[0].dias_caducidad_pass,
        rol:result.rows[0].rol,
        intentos_incorrectos:result.rows[0].intentos_incorrectos,
        fecha_registro:result.rows[0].fecha_registro
      };

      return res.status(200).json({ message: "Ingreso Exitoso", usuario: userData });
    }
  );
};

module.exports = LoginController;
