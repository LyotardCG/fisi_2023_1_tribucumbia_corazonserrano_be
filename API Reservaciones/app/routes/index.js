const reservations_routes = require("./reservaciones");
const sedes_routes = require("./sedes")

function routerApi(app) {
  app.use("/ne-reservaciones/servicio-al-cliente/v1", [
    reservations_routes,
    sedes_routes,
  ]);
}

module.exports = routerApi;