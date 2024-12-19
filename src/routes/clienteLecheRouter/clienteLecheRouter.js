const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const postClienteLecheHandler = require("../../handlers/clienteLeche/postClienteLecheHandler");
const empresaValidationModel = require("../../middlewares/clienteLeche/clienteLecheMid");


const clienteLecheRouter = Router()
clienteLecheRouter.post("/", modelValidateMid(empresaValidationModel), postClienteLecheHandler)


module.exports = clienteLecheRouter