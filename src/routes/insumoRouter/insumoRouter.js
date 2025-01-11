const { Router } = require("express");
const getInsumoHandler = require("../../handlers/insumo/getInsumoHandler");
const postInsumoHandler = require("../../handlers/insumo/postInsumoHandler");
const { insumoValidationModel } = require("../../middlewares/insumo/postInsumoMid");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const putInsumoHandler = require("../../handlers/insumo/putInsumoHandler");
const deleteInsumoHandler = require("../../handlers/insumo/deleteInsumoHandler");

const insumoRouter = Router();
insumoRouter.get("/:id_sector", getInsumoHandler);
insumoRouter.post("/", modelValidateMid(insumoValidationModel), postInsumoHandler) // cambio en la implementacion
insumoRouter.put("/", modelValidateMid(insumoValidationModel), putInsumoHandler) //queda modificar el put
insumoRouter.delete("/", deleteInsumoHandler)


module.exports = insumoRouter