const { Router } = require("express");
const postChequeRecibidoHandler = require("../../handlers/banco/postChequeRecibidoHandler");
const putChequeRecibidoHandler = require("../../handlers/banco/putChequeRecibidoHandler");
const getChequeRecibidoHandler = require("../../handlers/banco/getChequeRecibidoHandler");
const deleteChequeRecibidoHandler = require("../../handlers/banco/deleteChequeRecibidoHandler");
const marcarComoCobradoHandler = require("../../handlers/banco/marcarComoCobradoHandler");
const marcarComoEntregadoHandler = require("../../handlers/banco/marcarComoEntregadoHandler");

const bancoRouter = Router();

bancoRouter.get("/cheques", getChequeRecibidoHandler);
bancoRouter.post("/cheque", postChequeRecibidoHandler);
bancoRouter.put("/cheque", putChequeRecibidoHandler);
bancoRouter.put("/cheque/cobrado", marcarComoCobradoHandler);
bancoRouter.put("/cheque/entregado", marcarComoEntregadoHandler)
bancoRouter.delete("/cheque", deleteChequeRecibidoHandler);

module.exports = bancoRouter;
