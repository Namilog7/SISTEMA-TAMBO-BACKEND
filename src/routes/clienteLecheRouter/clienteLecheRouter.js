const { Router } = require("express");
const clienteLecheMid = require("../../middlewares/clienteLeche/clienteLecheMid");
const postClienteLecheHandler = require("../../handlers/clienteLeche/postClienteLecheHandler");


const clienteLecheRouter = Router()
clienteLecheRouter.post("/", clienteLecheMid, postClienteLecheHandler)


module.exports = clienteLecheRouter