const { Router } = require("express");
const getInsumoHandler = require("../../handlers/insumo/getInsumoHandler");
const postInsumoHandler = require("../../handlers/insumo/postInsumoHandler");
const postInsumoMid = require("../../middlewares/insumo/postInsumoMid");
const putInsumoHandler = require("../../handlers/insumo/putInsumoHandler");

const insumoRouter = Router();
insumoRouter.get("/:id", getInsumoHandler);
insumoRouter.post("/", postInsumoMid, postInsumoHandler)
insumoRouter.put("/", postInsumoMid, putInsumoHandler)


module.exports = insumoRouter