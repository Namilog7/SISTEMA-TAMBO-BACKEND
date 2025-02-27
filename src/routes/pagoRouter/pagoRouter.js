const { Router } = require("express");
const getPagoHandler = require("../../handlers/pago/getPagoHandler");
const postPagoHandler = require("../../handlers/pago/postPagoHandler");

const pagoRouter = Router();
pagoRouter.get("/:id", getPagoHandler);
pagoRouter.post("/", postPagoHandler)


module.exports = pagoRouter