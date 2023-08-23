"use strict";



var UsuarioController = require("../controllers/usuario-controller"),
    LoginController = require("../controllers/Login-controller"),
    express = require("express"),
    router = express.Router();

router
  //****USUARIO****
  .post("/login/:codigo_usuario", LoginController.login) // Nueva ruta para el inicio de sesión
  .get("/usuario/getall", UsuarioController.getAll)
  .post("/nuevousuario/agregar/:codigo_usuario", UsuarioController.post)


  .use(UsuarioController.error404)
  .use(LoginController.error404);

module.exports = router;

