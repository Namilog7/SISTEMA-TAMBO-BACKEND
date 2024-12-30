const { Router } = require("express");
const modelValidateMid = require("../../../middlewares/modelValidateMid");
const tanqueValidationModel = require("../../../middlewares/controlLechero/controlLecheroMid");
const postControlLecheroHandler = require("../../../handlers/controlLechero/postControlLecheroHandler");
const getInformeLecheroHandler = require("../../../handlers/controlLechero/getControlLecheroHandler");

const controlLecheroRouter = Router()
controlLecheroRouter.get("/", getInformeLecheroHandler)
controlLecheroRouter.post("/", postControlLecheroHandler);


module.exports = controlLecheroRouter