const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter");
const ganadoRouter = require("./ganadoRouter/ganadoRouter");
const retiroLecheRouter = require("./retiroLecheRouter/retiroLecheRouter");
const produccionLecheRouter = require("./produccionLecheRouter/produccionLecheRouter");
const controlVeterinarioRouter = require("./controlVeterinarioRouter/controlVeterinarioRouter");
const insumoRouter = require("./insumoRouter/insumoRouter");
const ventaLecheRouter = require("./ventaLecheRouter/ventaLecheRouter");

const router = Router();

router.use("/tambo", tamboRouter)
router.use("/ganado", ganadoRouter)
router.use("/retiroleche", retiroLecheRouter)
router.use("/produccionleche", produccionLecheRouter)
router.use("/controlveterinario", controlVeterinarioRouter)
router.use("/insumo", insumoRouter)
router.use("/ventaleche", ventaLecheRouter)


module.exports = router