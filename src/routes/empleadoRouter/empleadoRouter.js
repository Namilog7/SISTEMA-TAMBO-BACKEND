const { Router } = require("express");
const notaRouter = require("../notaRouter/notaRouter");
const pagoRouter = require("../pagoRouter/pagoRouter");
const getResumenHandler = require("../../handlers/resumen/getResumenHandler");
const postEmpleadoHandler = require("../../handlers/empleado/postEmpleadoHandler");
const getEmpleadoHandler = require("../../handlers/empleado/getEmpleadoHandler");
const postUsuarioParaEmpleado = require("../../handlers/empleado/postUsuarioParaEmpleado");
const putEmpeladoHandler = require("../../handlers/empleado/putEmpeladoHandler");
const deleteEmpleadoHandler = require("../../handlers/empleado/deleteEmpleadoHandler");
const deleteUsuarioEmpleadoHandler = require("../../handlers/empleado/deleteUsuarioEmpleadoHandler");

const empleadoRouter = Router();
empleadoRouter.post("/", postEmpleadoHandler);
empleadoRouter.delete("/:id", deleteEmpleadoHandler);
empleadoRouter.delete("/:id/usuario", deleteUsuarioEmpleadoHandler);
empleadoRouter.put("/", putEmpeladoHandler);
empleadoRouter.post("/usuario", postUsuarioParaEmpleado);
empleadoRouter.get("/", getEmpleadoHandler);
empleadoRouter.get("/resumen/:id", getResumenHandler);
empleadoRouter.use("/nota", notaRouter);
empleadoRouter.use("/pago", pagoRouter);

module.exports = empleadoRouter;
