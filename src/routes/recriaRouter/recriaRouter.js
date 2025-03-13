const { Router } = require("express");
const getRecriaHandler = require("../../handlers/recria/getRecriaHandler");
const postVentaRecria = require("../../handlers/recria/postVentaRecria");
const getVentaHandler = require("../../handlers/recria/getVentaHandler");
const getCompraHandler = require("../../handlers/recria/getCompraHandler");
const getIngresoHandler = require("../../handlers/recria/getIngreso");
const getMachoHandler = require("../../handlers/recria/getMachoHandler");
const deleteMovimientoHandler = require("../../handlers/recria/deleteMovimientoHandler");
const { Macho, LoteSiembra, CajaBancaria } = require("../../db");
const postMovimientoHandler = require("../../handlers/recria/postMovimiento");
const postIngresoHandler = require("../../handlers/recria/postIngresoHandler");

const recriaRouter = Router();
recriaRouter.get("/", getRecriaHandler)
recriaRouter.get("/venta", getVentaHandler)
recriaRouter.get("/compra", getCompraHandler)
recriaRouter.get("/ingreso", getIngresoHandler)
recriaRouter.post("/venta", postVentaRecria)
recriaRouter.post("/ingreso", postIngresoHandler)
recriaRouter.get("/macho", getMachoHandler)
recriaRouter.post("/macho/movimientos", postMovimientoHandler)
recriaRouter.delete("/macho/movimientos/:id", deleteMovimientoHandler)
recriaRouter.delete("/laconchatumadre", async () => {
    await Macho.destroy({ where: {} })
    await LoteSiembra.destroy({ where: {} })
    await CajaBancaria.destroy({ where: {} })
})



module.exports = recriaRouter