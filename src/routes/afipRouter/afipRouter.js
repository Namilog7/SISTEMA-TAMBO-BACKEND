const { Router } = require("express");
const postFacturaHandler = require("../../handlers/afip/postFacturaHandler");
const getCondicionIvaHandler = require("../../handlers/afip/getCondicionIvaHandler");

const afipRouter = Router();

afipRouter.post("/", postFacturaHandler);
afipRouter.post("/condicion_iva", getCondicionIvaHandler);

module.exports = afipRouter;
