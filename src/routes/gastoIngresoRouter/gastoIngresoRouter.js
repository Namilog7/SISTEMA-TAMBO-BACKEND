const { Router } = require("express");
const postGastoIngresoHandler = require("../../handlers/gastoIngreso/postGastoIngresoHandler");
const getGastoIngresoHandler = require("../../handlers/gastoIngreso/getGastoIngresoHandler");

const gastoIngresoRouter = Router();
gastoIngresoRouter.post("/", postGastoIngresoHandler);
gastoIngresoRouter.get("/:id", getGastoIngresoHandler);


module.exports = gastoIngresoRouter