const { Router } = require("express");
const getCajaHandler = require("../../handlers/caja/getCajaHandler");

const cajaRouter = Router();

cajaRouter.get("/", getCajaHandler)

module.exports = cajaRouter