const { Router } = require("express");
const postGastoIngresoHandler = require("../../handlers/gastoIngreso/postGastoIngresoHandler");
const getGastoIngresoHandler = require("../../handlers/gastoIngreso/getGastoIngresoHandler");
const postMetodoGastoIngresoHandler = require("../../handlers/gastoIngreso/postMetodoGastoIngresoHandler");
const anularGastoIngresoHandler = require("../../handlers/gastoIngreso/anularGastoIngresoHandler");

const gastoIngresoRouter = Router();
gastoIngresoRouter.post("/", postGastoIngresoHandler);
gastoIngresoRouter.get("/", getGastoIngresoHandler);
gastoIngresoRouter.put("/anular", anularGastoIngresoHandler)
gastoIngresoRouter.post("/metodo", postMetodoGastoIngresoHandler)

module.exports = gastoIngresoRouter