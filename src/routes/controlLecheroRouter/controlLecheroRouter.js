const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const tanqueValidationModel = require("../../middlewares/controlLechero/controlLecheroMid");
const postControlLecheroHandler = require("../../handlers/controlLechero/postControlLecheroHandler");
const getControlLecheroHandler = require("../../handlers/controlLechero/getControlLecheroHandler");

const controlLecheroRouter = Router()
controlLecheroRouter.get("/", getControlLecheroHandler)
controlLecheroRouter.post("/", modelValidateMid(tanqueValidationModel), postControlLecheroHandler);


module.exports = controlLecheroRouter