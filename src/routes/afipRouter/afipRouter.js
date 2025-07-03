const { Router } = require("express");
const postFacturaHandler = require("../../handlers/afip/postFacturaHandler");
const getCondicionIvaHandler = require("../../handlers/afip/getCondicionIvaHandler");
const getFacturasEmitidas = require("../../handlers/afip/getFacturasEmitidas");
const getFacturaPorNumero = require("../../handlers/afip/getPorNumeroComprobante");

const afipRouter = Router();

afipRouter.post("/", postFacturaHandler);
afipRouter.post("/condicion_iva", getCondicionIvaHandler);
afipRouter.get("/facturas", getFacturasEmitidas);
afipRouter.get("/facturas/:numero", getFacturaPorNumero);

module.exports = afipRouter;
