const { Router } = require("express");
const getRecriaHandler = require("../../handlers/recria/getRecriaHandler");
const postVentaRecria = require("../../handlers/recria/postVentaRecria");
const postCompraHandler = require("../../handlers/recria/postCompraHandler");
const getVentaHandler = require("../../handlers/recria/getVentaHandler");
const getCompraHandler = require("../../handlers/recria/getCompraHandler");

const recriaRouter = Router();
recriaRouter.get("/", getRecriaHandler)
recriaRouter.get("/venta", getVentaHandler)
recriaRouter.get("/compra", getCompraHandler)
recriaRouter.post("/venta", postVentaRecria)
recriaRouter.post("/compra", postCompraHandler)

module.exports = recriaRouter