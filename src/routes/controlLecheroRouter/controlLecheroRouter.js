const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const tanqueValidationModel = require("../../middlewares/controlLechero/controlLecheroMid");
const postControlLecheroHandler = require("../../handlers/controlLechero/postControlLecheroHandler");

const controlLecheroRouter = Router()
controlLecheroRouter.post("/", modelValidateMid(tanqueValidationModel), postControlLecheroHandler);


module.exports = controlLecheroRouter