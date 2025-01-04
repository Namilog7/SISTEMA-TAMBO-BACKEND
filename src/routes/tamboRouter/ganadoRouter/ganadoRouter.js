const { Router } = require("express");
const getGanadoHandler = require("../../../handlers/ganado/getGanadoHandler");
const postGanadoHandler = require("../../../handlers/ganado/postGanadoHandler");
const deleteGanadoHandler = require("../../../handlers/ganado/deleteGanadoHandler");
const putGanadoHandler = require("../../../handlers/ganado/putGanadoHandler");
const modelValidateMid = require("../../../middlewares/modelValidateMid");
const { ganadoValidationModel, ganadoValidationModelPut } = require("../../../middlewares/ganado/postGanadoMid");
const inseminacionRouter = require("./inseminacionRouter/inseminacionRouter");

const ganadoRouter = Router()
ganadoRouter.get("/", getGanadoHandler);
ganadoRouter.post("/", modelValidateMid(ganadoValidationModel), postGanadoHandler);
ganadoRouter.delete("/:id", deleteGanadoHandler);
ganadoRouter.put("/", modelValidateMid(ganadoValidationModelPut), putGanadoHandler)
ganadoRouter.use("/inseminacion", inseminacionRouter)




module.exports = ganadoRouter