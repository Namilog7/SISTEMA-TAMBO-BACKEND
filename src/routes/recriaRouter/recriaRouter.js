const { Router } = require("express");
const getRecriaHandler = require("../../handlers/recria/getRecriaHandler");
const postVentaRecria = require("../../handlers/recria/postVentaRecria");
const postCompraHandler = require("../../handlers/recria/postCompraHandler");

const recriaRouter = Router();
recriaRouter.get("/", getRecriaHandler)
recriaRouter.post("/venta", postVentaRecria)
recriaRouter.post("/compra", postCompraHandler)

module.exports = recriaRouter