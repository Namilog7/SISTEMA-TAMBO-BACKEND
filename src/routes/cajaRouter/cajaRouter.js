const { Router } = require("express");
const getCajaHandler = require("../../handlers/caja/getCajaHandler");
const verifyToken = require("../../middlewares/user/verifyToken");
const postResumenHandler = require("../../handlers/caja/postResumenHandler");
const postTransferenciaHandler = require("../../handlers/caja/postTransferenciaHandler");
const postChequeHandler = require("../../handlers/caja/postChequeHandler");
const putTransferenciaHandler = require("../../handlers/caja/putTransferenciaEstado");
const putChequeHandler = require("../../handlers/caja/putChequeHandler");

const cajaRouter = Router();

cajaRouter.get("/", verifyToken("ADMIN"), getCajaHandler)
cajaRouter.post("/resumen", postResumenHandler)
cajaRouter.post("/transferencia", postTransferenciaHandler)
cajaRouter.put("/transferencia/:id", putTransferenciaHandler)
cajaRouter.post("/cheque", postChequeHandler)
cajaRouter.put("/cheque/:id", putChequeHandler)

module.exports = cajaRouter