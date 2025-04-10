const { Router } = require("express");
const postCuentaHandler = require("../../handlers/cuenta/postCuentaHandler");
const getCuentaHandler = require("../../handlers/cuenta/getCuentaHandler");
const deleteCuentaHandler = require("../../handlers/cuenta/deleteCuentaHandler");
const putCuentaHandler = require("../../handlers/cuenta/putCuentaHandler");

const cuentaRouter = Router();

cuentaRouter.get("/", getCuentaHandler)
cuentaRouter.post("/", postCuentaHandler)
cuentaRouter.delete("/:id", deleteCuentaHandler)
cuentaRouter.put("/", putCuentaHandler)

module.exports = cuentaRouter