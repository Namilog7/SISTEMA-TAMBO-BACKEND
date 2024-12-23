const { Router } = require("express");
const getProovedorHandler = require("../../handlers/proovedor/getProovedorHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const proovedorValidateMid = require("../../middlewares/proovedor/proovedorValidateMid");
const postProovedorHandler = require("../../handlers/proovedor/postProovedorHandler");

const proovedorRouter = Router();
proovedorRouter.get("/", getProovedorHandler);
proovedorRouter.post("/", modelValidateMid(proovedorValidateMid), postProovedorHandler);



module.exports = proovedorRouter