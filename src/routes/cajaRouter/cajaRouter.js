const { Router } = require("express");
const getCajaHandler = require("../../handlers/caja/getCajaHandler");
const verifyToken = require("../../middlewares/user/verifyToken");
const postResumenHandler = require("../../handlers/caja/postResumenHandler");

const cajaRouter = Router();

cajaRouter.get("/", verifyToken("ADMIN"), getCajaHandler)
cajaRouter.post("/resumen", postResumenHandler)

module.exports = cajaRouter