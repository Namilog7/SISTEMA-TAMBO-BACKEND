const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const postClienteLecheHandler = require("../../handlers/clienteLeche/postClienteLecheHandler");
const empresaValidationModel = require("../../middlewares/clienteLeche/clienteLecheMid");
const putClienteLecheHandler = require("../../handlers/clienteLeche/putClienteLecheHandler");
const getClienteLecheHandler = require("../../handlers/clienteLeche/getClienteLecheHandler");


const clienteLecheRouter = Router()
clienteLecheRouter.get("/", getClienteLecheHandler)
clienteLecheRouter.post("/", modelValidateMid(empresaValidationModel), postClienteLecheHandler);
clienteLecheRouter.put("/", putClienteLecheHandler)


module.exports = clienteLecheRouter