const { Router } = require("express");
const postFacturaHandler = require("../../handlers/afip/postFacturaHandler");
const getCondicionIvaHandler = require("../../handlers/afip/getCondicionIvaHandler");
const getFacturasEmitidas = require("../../handlers/afip/getFacturasEmitidas");

const afipRouter = Router();

afipRouter.post("/", postFacturaHandler);
afipRouter.post("/condicion_iva", getCondicionIvaHandler);
afipRouter.get("/facturas", getFacturasEmitidas);

module.exports = afipRouter;
