const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const insumoRouter = require("../routes/insumoRouter/insumoRouter");
const proovedorRouter = require("./proovedorRouter/proovedorRouter");
const clienteRouter = require("./clienteRouter/clienteRouter");
const cajaRouter = require("./cajaRouter/cajaRouter");
const notaRouter = require("../routes/notaRouter/notaRouter")

const router = Router();

router.use("/tambo", tamboRouter);
router.use("/insumo", insumoRouter);
router.use("/proveedor", proovedorRouter);
router.use("/cliente", clienteRouter);
router.use("/caja", cajaRouter)
router.use("/nota", notaRouter)


module.exports = router