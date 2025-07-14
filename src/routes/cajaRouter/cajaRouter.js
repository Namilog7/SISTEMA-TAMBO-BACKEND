const { Router } = require("express");
const getCajaHandler = require("../../handlers/caja/getCajaHandler");
const verifyToken = require("../../middlewares/user/verifyToken");
const postResumenHandler = require("../../handlers/caja/postResumenHandler");
const postTransferenciaHandler = require("../../handlers/caja/postTransferenciaHandler");
const postChequeHandler = require("../../handlers/caja/postChequeHandler");
const putTransferenciaHandler = require("../../handlers/caja/putTransferenciaEstado");
const putChequeHandler = require("../../handlers/caja/putChequeHandler");
const postCargarComprobanteHandler = require("../../handlers/caja/postCargarComprobanteHandler");
const getArqueoHandler = require("../../handlers/caja/getArqueoHandler");
const getIngresoEfectivo = require("../../handlers/caja/getIngresoEfectivo");
const anularMetodoEfectivo = require("../../handlers/caja/anularMetodoEfectivo");
const getChequeHandler = require("../../handlers/caja/getChequeHandler");
const getTransferenciaHandler = require("../../handlers/caja/getTransferenciaHandler");
const getComprobantesCargadosHandler = require("../../handlers/caja/getComprobantesCargadosHandler");

const cajaRouter = Router();

cajaRouter.get("/", verifyToken("ADMIN"), getCajaHandler);
cajaRouter.get("/efectivo", getIngresoEfectivo);
cajaRouter.put("/anular-efectivo", anularMetodoEfectivo);
cajaRouter.get("/transferencia", getTransferenciaHandler);
cajaRouter.post("/resumen", verifyToken("ADMIN"), postResumenHandler);
cajaRouter.post("/transferencia", verifyToken("ADMIN"), postTransferenciaHandler);
cajaRouter.put("/transferencia/:id", verifyToken("ADMIN"), putTransferenciaHandler);
cajaRouter.get("/cheque", getChequeHandler);
cajaRouter.post("/cheque", verifyToken("ADMIN"), postChequeHandler);
cajaRouter.put("/cheque/:id", verifyToken("ADMIN"), putChequeHandler);
cajaRouter.post("/cargar-comprobante", postCargarComprobanteHandler);
cajaRouter.get("/cargar-comprobante", getComprobantesCargadosHandler);
cajaRouter.get("/arqueo", getArqueoHandler);

module.exports = cajaRouter;
