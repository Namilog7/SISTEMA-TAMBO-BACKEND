const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const insumoRouter = require("../routes/insumoRouter/insumoRouter");
const proovedorRouter = require("./proovedorRouter/proovedorRouter");

const router = Router();

router.use("/tambo", tamboRouter)
router.use("/insumo", insumoRouter)
router.use("/proovedor", proovedorRouter)



module.exports = router