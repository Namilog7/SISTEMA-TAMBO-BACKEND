const { Router } = require("express");
const postPolizaHandler = require("../../handlers/poliza/postPolizaHandler");
const getPolizaHandler = require("../../handlers/poliza/getPolizaHandler");
const deletePolizaHandler = require("../../handlers/poliza/deletePolizaHandler");
const putPolizaHandler = require("../../handlers/poliza/putPolizaHandler");
const putVencidaHandler = require("../../handlers/poliza/putVencidaHandler");

const polizaRouter = Router();
polizaRouter.post("/", postPolizaHandler);
polizaRouter.get("/", getPolizaHandler);
polizaRouter.put("/", putPolizaHandler);
polizaRouter.put("/marcar-vencida", putVencidaHandler);
polizaRouter.delete("/:id", deletePolizaHandler);

module.exports = polizaRouter;
