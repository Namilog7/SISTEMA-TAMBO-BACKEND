const { Router } = require("express");
const getGanadoHandler = require("../../../handlers/tambo/ganado/getGanadoHandler");
const postGanadoHandler = require("../../../handlers/tambo/ganado/postGanadoHandler");
const deleteGanadoHandler = require("../../../handlers/tambo/ganado/deleteGanadoHandler");
const putGanadoHandler = require("../../../handlers/tambo/ganado/putGanadoHandler");
const modelValidateMid = require("../../../middlewares/modelValidateMid");
const { ganadoValidationModel, ganadoValidationModelPut } = require("../../../middlewares/tambo/ganado/postGanadoMid");
const inseminacionRouter = require("../ganadoRouter/inseminacionRouter/inseminacionRouter");

const ganadoRouter = Router()
ganadoRouter.get("/", getGanadoHandler);
ganadoRouter.post("/", modelValidateMid(ganadoValidationModel), postGanadoHandler);
ganadoRouter.delete("/:id", deleteGanadoHandler);
ganadoRouter.put("/", modelValidateMid(ganadoValidationModelPut), putGanadoHandler)
ganadoRouter.use("/inseminacion", inseminacionRouter)




module.exports = ganadoRouter