const { Router } = require("express");
const getCasaPropietarioHandler = require("../../handlers/casa/getCasaPropietarioHandler");
const postCompromisoPagoHandler = require("../../handlers/casa/postCompromisoPagoHandler");
const postPagoEventualHandler = require("../../handlers/casa/postPagoEventualHandler");
const postPropietarioHandler = require("../../handlers/casa/postPropietarioHandler");

const casaRouter = Router()

casaRouter.get("/", getCasaPropietarioHandler);
casaRouter.post("/propietario", postPropietarioHandler)
casaRouter.post("/compromiso", postCompromisoPagoHandler)
casaRouter.post("/eventual", postPagoEventualHandler)

module.exports = casaRouter