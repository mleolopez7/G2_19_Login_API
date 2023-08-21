"use strict";

var UsuarioController = require("../controllers/usuario-controller"),
    express = require("express"),
    router = express.Router();

router
  //****USUARIO****
  .post("/usuario/login/:codigo_usuario", UsuarioController.login) // Nueva ruta para el inicio de sesión
  .get("/usuario/getall", UsuarioController.getAll)
  .post("/usuario/insertar/:codigo_usuario", UsuarioController.post)
  .post("/usuario/getOne", UsuarioController.getOne)

  .use(UsuarioController.error404);

module.exports = router;

