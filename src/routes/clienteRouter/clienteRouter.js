const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const postClienteHandler = require("../../handlers/cliente/postClienteHandler");
const empresaValidationModel = require("../../middlewares/cliente/clienteMid");
const putClienteHandler = require("../../handlers/cliente/putClienteHandler");
const getClienteHandler = require("../../handlers/cliente/getClienteHandler");


const clienteRouter = Router()
clienteRouter.get("/", getClienteHandler)
clienteRouter.post("/", modelValidateMid(empresaValidationModel), postClienteHandler);
clienteRouter.put("/", putClienteHandler)


module.exports = clienteRouter