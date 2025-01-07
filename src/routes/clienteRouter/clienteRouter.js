const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const postClienteHandler = require("../../handlers/clienteLeche/postClienteHandler");
const empresaValidationModel = require("../../middlewares/clienteLeche/clienteLecheMid");
const putClienteHandler = require("../../handlers/clienteLeche/putClienteHandler");
const getClienteHandler = require("../../handlers/clienteLeche/getClienteHandler");


const clienteRouter = Router()
clienteRouter.get("/", getClienteHandler)
clienteRouter.post("/", modelValidateMid(empresaValidationModel), postClienteHandler);
clienteRouter.put("/", putClienteHandler)


module.exports = clienteRouter