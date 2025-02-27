const { Router } = require("express");
const getProveedorHandler = require("../../handlers/proveedor/getProovedorHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid");
const proovedorValidateMid = require("../../middlewares/proveedor/proovedorValidateMid");
const postProveedorHandler = require("../../handlers/proveedor/postProovedorHandler");
const putProovedorHandler = require("../../handlers/proveedor/putProovedorHandler");
const deleteProveedorHandler = require("../../handlers/proveedor/deleteProveedorHandler")
const notaRouter = require("../notaRouter/notaRouter");
const pagoRouter = require("../pagoRouter/pagoRouter");
const getResumenHandler = require("../../handlers/resumen/getResumenHandler");


const proveedorRouter = Router();
proveedorRouter.get("/", getProveedorHandler);
proveedorRouter.post("/", modelValidateMid(proovedorValidateMid), postProveedorHandler);
proveedorRouter.put("/", putProovedorHandler)
proveedorRouter.delete("/:id", deleteProveedorHandler)
proveedorRouter.get("/resumen/:id", getResumenHandler)
proveedorRouter.use("/nota", notaRouter)
proveedorRouter.use("/pago", pagoRouter)



module.exports = proveedorRouter