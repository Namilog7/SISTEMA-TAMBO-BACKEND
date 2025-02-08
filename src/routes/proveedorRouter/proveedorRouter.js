const { Router } = require("express");
const getProveedorHandler = require("../../handlers/proovedor/getProovedorHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const proovedorValidateMid = require("../../middlewares/proovedor/proovedorValidateMid");
const postProveedorHandler = require("../../handlers/proovedor/postProovedorHandler");
const putProovedorHandler = require("../../handlers/proovedor/putProovedorHandler");

const proveedorRouter = Router();
proveedorRouter.get("/", getProveedorHandler);
proveedorRouter.post("/", modelValidateMid(proovedorValidateMid), postProveedorHandler);
proveedorRouter.put("/", putProovedorHandler)



module.exports = proveedorRouter