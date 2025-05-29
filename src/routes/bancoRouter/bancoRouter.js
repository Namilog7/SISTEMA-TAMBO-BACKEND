const { Router } = require("express");
const postChequeRecibidoHandler = require("../../handlers/banco/postChequeRecibidoHandler");
const putChequeRecibidoHandler = require("../../handlers/banco/putChequeRecibidoHandler");
const getChequeRecibidoHandler = require("../../handlers/banco/getChequeRecibidoHandler");
const deleteChequeRecibidoHandler = require("../../handlers/banco/deleteChequeRecibidoHandler");
const marcarComoCobradoHandler = require("../../handlers/banco/marcarComoCobradoHandler");

const bancoRouter = Router();

bancoRouter.get("/cheques", getChequeRecibidoHandler);
bancoRouter.post("/cheque", postChequeRecibidoHandler);
bancoRouter.put("/cheque", putChequeRecibidoHandler);
bancoRouter.put("/cheque/cobrado", marcarComoCobradoHandler);
bancoRouter.delete("/cheque", deleteChequeRecibidoHandler);

module.exports = bancoRouter;
