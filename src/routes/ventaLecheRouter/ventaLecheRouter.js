const { Router } = require("express");
const getVentaLecheHandler = require("../../handlers/ventaLeche/getVentaLecheHandler");
const postVentaLecheHandler = require("../../handlers/ventaLeche/postVentaLecheHandler");
const ventaLecheValidationModel = require("../../middlewares/ventaLeche/postVentaLecheMid");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const ventaLecheRouter = Router()
ventaLecheRouter.get("/", getVentaLecheHandler)
ventaLecheRouter.post("/", modelValidateMid(ventaLecheValidationModel), postVentaLecheHandler)

module.exports = ventaLecheRouter