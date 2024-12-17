const { Router } = require("express");
const getVentaLecheHandler = require("../../handlers/ventaLeche/getVentaLecheHandler");

const ventaLecheRouter = Router()

ventaLecheRouter.get("/:id", getVentaLecheHandler)

module.exports = ventaLecheRouter