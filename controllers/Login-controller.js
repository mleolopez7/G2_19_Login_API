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

      // Comprobar la contraseña
      if (result.rows[0].contra !== contra) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Autenticación exitosa
      return res.status(200).json({ message: "Ingreso Exitoso" });
    }
  );
};

module.exports = LoginController;
