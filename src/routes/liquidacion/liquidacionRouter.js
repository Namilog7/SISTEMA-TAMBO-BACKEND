const { Router } = require("express");
const liquidacionHandler = require("../../handlers/liquidacion/liquidacionHandler");
const getLiquidacionHandler = require("../../handlers/liquidacion/getLiquidacionHandler");

const liquidacionRouter = Router()
liquidacionRouter.get("/", getLiquidacionHandler)
liquidacionRouter.post("/", liquidacionHandler)



module.exports = liquidacionRouter