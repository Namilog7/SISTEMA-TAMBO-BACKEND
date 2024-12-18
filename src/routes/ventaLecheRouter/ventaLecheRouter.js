const { Router } = require("express");
const getVentaLecheHandler = require("../../handlers/ventaLeche/getVentaLecheHandler");
const postVentaLecheHandler = require("../../handlers/ventaLeche/postVentaLecheHandler");
const postVentaLecheMid = require("../../middlewares/ventaLeche/postVentaLecheMid");

const ventaLecheRouter = Router()
ventaLecheRouter.get("/:id", getVentaLecheHandler)
ventaLecheRouter.post("/", postVentaLecheMid, postVentaLecheHandler)

module.exports = ventaLecheRouter