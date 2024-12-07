const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const ganadoRouter = require("./ganadoRouter/ganadoRouter");
const retiroLecheRouter = require("./retiroLecheRouter/retiroLecheRouter");

const router = Router();

router.use("/tambo", tamboRouter)
router.use("/ganado", ganadoRouter)
router.use("/retiroleche", retiroLecheRouter)


module.exports = router