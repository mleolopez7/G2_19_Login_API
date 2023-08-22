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
        return res.status(500).json({ error: "Errores en el servidor" });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Usuario no existe" });
      }

      const user = result.rows[0];

      if (user.estado !== "A") {
        return res.status(401).json({ error: "Usuario inactivo" });
      }

      if (user.expira_pass) {
        const expiracionContraseña = new Date(user.ultimo_ingreso);
        expiracionContraseña.setDate(
          expiracionContraseña.getDate() + user.dias_caducidad_pass
        );

        if (expiracionContraseña <= new Date()) {
          return res.status(401).json({
            error: "La contraseña ha expirado, contactese con soporte",
          });
        }
      }

      if (user.contra !== contra) {
        user.intentos_incorrectos = user.intentos_incorrectos + 1;

        if (user.intentos_incorrectos >= 3) {
          conn.query(
            "UPDATE usuario SET intentos_incorrectos = $1, estado = $2 WHERE codigo_usuario = $3",
            [user.intentos_incorrectos, "B", codigo_usuario],
            (updateErr) => {
              if (updateErr) {
                return res
                  .status(500)
                  .json({ error: "Error al bloquear usuario" });
              }

              return res
                .status(401)
                .json({
                  error: "Su usuario ha sido bloqueado por intentos fallidos",
                });
            }
          );
        } else {
          let remainingAttempts = 3 - user.intentos_incorrectos;
          let message = `Contraseña incorrecta.`;
          conn.query(
            "UPDATE usuario SET intentos_incorrectos = $1 WHERE codigo_usuario = $2",
            [user.intentos_incorrectos, codigo_usuario],
            (updateErr) => {
              if (updateErr) {
                return res
                  .status(500)
                  .json({ error: "Error al actualizar intentos" });
              }

              return res.status(401).json({ error: message });
            }
          );
        }
      } else {
        conn.query(
          "UPDATE usuario SET intentos_incorrectos = 0 WHERE codigo_usuario = $1",
          [codigo_usuario],
          (updateErr) => {
            if (updateErr) {
              return res
                .status(500)
                .json({ error: "Error al restablecer intentos" });
            }

            return res
              .status(200)
              .json({ message: "Validacion con exito", user });
          }
        );
      }
    }
  );
};

module.exports = LoginController;
