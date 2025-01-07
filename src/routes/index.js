const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const insumoRouter = require("../routes/insumoRouter/insumoRouter");
const proovedorRouter = require("./proovedorRouter/proovedorRouter");
const clienteRouter = require("./clienteRouter/clienteRouter");

const router = Router();

router.use("/tambo", tamboRouter);
router.use("/insumo", insumoRouter);
router.use("/proovedor", proovedorRouter);
router.use("/cliente", clienteRouter)


module.exports = router