"use strict";

var conn = require("../config/db-connection"),
  LoginModel = () => {};

LoginModel.login = (codigo_usuario, contra, cb) => {
  conn.query(
    "SELECT * FROM usuario WHERE codigo_usuario = $1 AND contra = $2",
    [codigo_usuario, contra],
    cb
  );
};

module.exports = LoginModel;
