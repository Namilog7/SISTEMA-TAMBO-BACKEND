const { Router } = require("express");
const liquidacionHandler = require("../../handlers/tambo/retiroleche/liquidacion/liquidacionHandler");
const getLiquidacionHandler = require("../../handlers/tambo/retiroleche/liquidacion/getLiquidacionHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const liquidacionValidateMid = require("../../middlewares/tambo/retiroleche/liquidacion/liquidacionValidateMid")

const liquidacionRouter = Router()
liquidacionRouter.get("/", getLiquidacionHandler)
liquidacionRouter.post("/", modelValidateMid(liquidacionValidateMid), liquidacionHandler)



module.exports = liquidacionRouter