const { Router } = require("express");
const getCasaPropietarioHandler = require("../../handlers/casa/getCasaPropietarioHandler");
const postCompromisoPagoHandler = require("../../handlers/casa/postCompromisoPagoHandler");
const postPagoEventualHandler = require("../../handlers/casa/postPagoEventualHandler");
const postPropietarioHandler = require("../../handlers/casa/postPropietarioHandler");
const postMesesPagoHandler = require("../../handlers/casa/postMesesPagoHandler");
const getCompromisoPagoHandler = require("../../handlers/casa/getCompromisoPagoHandler");
const deletePropietarioHandler = require("../../handlers/casa/deletePropietarioHandler");
const getPagoEventualHandler = require("../../handlers/casa/getPagoEventualHandler");
const putPropietarioHandler = require("../../handlers/casa/putPropietarioHandler");

const casaRouter = Router()

casaRouter.get("/", getCasaPropietarioHandler);
casaRouter.post("/propietario", postPropietarioHandler);
casaRouter.put("/propietario", putPropietarioHandler)
casaRouter.delete("/propietario/:id", deletePropietarioHandler)
casaRouter.post("/compromiso", postCompromisoPagoHandler)
casaRouter.post("/eventual", postPagoEventualHandler)
casaRouter.get("/eventual", getPagoEventualHandler)
casaRouter.get("/compromiso/pagos", getCompromisoPagoHandler)
casaRouter.post("/compromiso/pagar", postMesesPagoHandler)

module.exports = casaRouter