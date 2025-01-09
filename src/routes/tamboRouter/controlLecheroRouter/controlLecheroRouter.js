const { Router } = require("express");
const modelValidateMid = require("../../../middlewares/modelValidateMid");
const tanqueValidationModel = require("../../../middlewares/tambo/controlLechero/controlLecheroMid");
const postControlLecheroHandler = require("../../../handlers/tambo/controlLechero/postControlLecheroHandler");
const getInformeLecheroHandler = require("../../../handlers/tambo/controlLechero/getControlLecheroHandler");

const controlLecheroRouter = Router()
controlLecheroRouter.get("/", getInformeLecheroHandler)
controlLecheroRouter.post("/", postControlLecheroHandler);


module.exports = controlLecheroRouter