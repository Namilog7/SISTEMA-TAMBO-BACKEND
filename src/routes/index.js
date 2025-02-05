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


module.exports = router