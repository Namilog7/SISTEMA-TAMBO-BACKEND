const { Router } = require("express");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const controlLecheroMid = require("../../middlewares/controlLechero/controlLecheroMid");
const postControlLecheroHandler = require("../../handlers/controlLechero/postControlLecheroHandler");

const controlLecheroRouter = Router()
controlLecheroRouter.post("/", postControlLecheroHandler);
controlLecheroRouter.put("/",)

module.exports = controlLecheroRouter