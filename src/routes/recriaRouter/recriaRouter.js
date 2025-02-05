const { Router } = require("express");
const getRecriaHandler = require("../../handlers/recria/getRecriaHandler");
const postVentaRecria = require("../../handlers/recria/postVentaRecria");
const postCompraHandler = require("../../handlers/recria/postCompraHandler");
const getVentaHandler = require("../../handlers/recria/getVentaHandler");
const getCompraHandler = require("../../handlers/recria/getCompraHandler");
const getIngresoHandler = require("../../handlers/recria/getIngreso");

const recriaRouter = Router();
recriaRouter.get("/", getRecriaHandler)
recriaRouter.get("/venta", getVentaHandler)
recriaRouter.get("/compra", getCompraHandler)
recriaRouter.get("/ingreso", getIngresoHandler)
recriaRouter.post("/venta", postVentaRecria)
recriaRouter.post("/ingreso", postCompraHandler)


module.exports = recriaRouter