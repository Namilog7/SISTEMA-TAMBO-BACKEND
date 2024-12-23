const { Router } = require("express");
const getInsumoHandler = require("../../handlers/insumo/getInsumoHandler");
const postInsumoHandler = require("../../handlers/insumo/postInsumoHandler");
const { insumoValidationModel } = require("../../middlewares/insumo/postInsumoMid");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const putInsumoHandler = require("../../handlers/insumo/putInsumoHandler");

const insumoRouter = Router();
insumoRouter.get("/:id", getInsumoHandler);
insumoRouter.post("/", modelValidateMid(insumoValidationModel), postInsumoHandler) // cambio en la implementacion
insumoRouter.put("/", modelValidateMid(insumoValidationModel), putInsumoHandler) //queda modificar el put


module.exports = insumoRouter