const { Router } = require("express");
const getPagoHandler = require("../../handlers/pago/getPagoHandler");
const postPagoHandler = require("../../handlers/pago/postPagoHandler");
const getPagosHandler = require("./getPagosHandler");

const pagoRouter = Router();
pagoRouter.get("/", getPagosHandler);
pagoRouter.get("/:id", getPagoHandler);
pagoRouter.post("/", postPagoHandler);


module.exports = pagoRouter