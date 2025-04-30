const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const insumoRouter = require("../routes/insumoRouter/insumoRouter");
const proveedorRouter = require("./proveedorRouter/proveedorRouter");
const clienteRouter = require("./clienteRouter/clienteRouter");
const cajaRouter = require("./cajaRouter/cajaRouter");
const notaRouter = require("../routes/notaRouter/notaRouter")
const sectorRouter = require("../routes/sectorRouter/sectorRouter");
const recriaRouter = require("./recriaRouter/recriaRouter");
const userRouter = require("./userRouter/userRouter");
const fabricaRouter = require("./fabricaRouter/fabricaRouter");
const agriculturaRouter = require("./agriculturaRouter/agriculturaRouter");
const cuentaRouter = require("../routes/cuentaRouter/cuentaRouter")

const getSistemaMovimientoHandler = require("../handlers/sistema-movimiento/getSistemaMovimientoHandler");
const casaRouter = require("./casaRouter/casaRouter");
const polizaRouter = require("./polizaRouter/polizaRouter");

const router = Router();

router.use("/sector", sectorRouter)
router.use("/tambo", tamboRouter);
router.use("/insumo", insumoRouter);
router.use("/proveedor", proveedorRouter);
router.use("/cliente", clienteRouter);
router.use("/caja", cajaRouter)
router.use("/nota", notaRouter)
router.use("/recria", recriaRouter)
router.use("/user", userRouter)
router.use("/fabrica", fabricaRouter)
router.use("/agricultura", agriculturaRouter)
router.use("/casa", casaRouter)
router.use("/cuenta", cuentaRouter)
router.use("/poliza", polizaRouter)
router.get("/sistema-movimiento", getSistemaMovimientoHandler)


module.exports = router