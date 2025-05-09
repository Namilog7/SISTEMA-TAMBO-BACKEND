const { Router } = require("express");
const postChequeRecibidoHandler = require("../../handlers/banco/postChequeRecibidoHandler");
const putChequeRecibidoHandler = require("../../handlers/banco/putChequeRecibidoHandler");
const getChequeRecibidoHandler = require("../../handlers/banco/getChequeRecibidoHandler");

const bancoRouter = Router();

bancoRouter.get("/", getChequeRecibidoHandler);
bancoRouter.post("/", postChequeRecibidoHandler);
bancoRouter.put("/", putChequeRecibidoHandler);





module.exports = bancoRouter