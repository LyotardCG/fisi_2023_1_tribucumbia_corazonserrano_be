const express = require("express");

const users_routes = require("./usuarios");
const clients_routes = require("./clientes");
const auth_routes = require("./auth");

function routerApi(app) {
  // const router = express.Router()
  // router.
  app.use("/ne-usuarios/servicio-al-cliente/v1", [
    auth_routes,
    users_routes,
    clients_routes,
  ]);
}

module.exports = routerApi;