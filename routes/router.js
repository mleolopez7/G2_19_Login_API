"use strict";

var UsuarioController = require("../controllers/usuario-controller"),
    express = require("express"),
    router = express.Router();

router
  //****USUARIO****
  //.post("/usuario/login/:codigo_usuario", UsuarioController.login)
  .get("/usuario/getall", UsuarioController.getAll)
  .post("/usuario/insertar/:codigo_usuario", UsuarioController.post)
  
  .use(UsuarioController.error404)

module.exports = router;