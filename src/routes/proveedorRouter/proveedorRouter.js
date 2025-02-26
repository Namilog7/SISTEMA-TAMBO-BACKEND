const { Router } = require("express");
const getProveedorHandler = require("../../handlers/proveedor/getProovedorHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const proovedorValidateMid = require("../../middlewares/proveedor/proovedorValidateMid");
const postProveedorHandler = require("../../handlers/proveedor/postProovedorHandler");
const putProovedorHandler = require("../../handlers/proveedor/putProovedorHandler");

const proveedorRouter = Router();
proveedorRouter.get("/", getProveedorHandler);
proveedorRouter.post("/", modelValidateMid(proovedorValidateMid), postProveedorHandler);
proveedorRouter.put("/", putProovedorHandler)



module.exports = proveedorRouter