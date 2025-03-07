const { Router } = require("express");
const getCajaHandler = require("../../handlers/caja/getCajaHandler");
const verifyToken = require("../../middlewares/user/verifyToken");

const cajaRouter = Router();

cajaRouter.get("/", verifyToken("ADMIN"), getCajaHandler)

module.exports = cajaRouter