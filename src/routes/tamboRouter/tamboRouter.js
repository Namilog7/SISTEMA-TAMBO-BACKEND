const { Router } = require("express");
/* const postTamboHandler = require("../../handlers/tambo/postTamboHandler");
const deleteTamboHandler = require("../../handlers/tambo/deleteTamboHandler");
const putTamboHandler = require("../../handlers/tambo/putTamboHandler");
const postTamboMid = require("../../middlewares/tambo/postTamboMid");
const ventaLecheRouter = require("../../routes/tamboRouter/ventaLecheRouter/ventaLecheRouter"); */
const ganadoRouter = require("../../routes/tamboRouter/ganadoRouter/ganadoRouter");
const retiroLecheRouter = require("../../routes/tamboRouter/retiroLecheRouter/retiroLecheRouter");
const produccionLecheRouter = require("../../routes/tamboRouter/produccionLecheRouter/produccionLecheRouter");
const controlVeterinarioRouter = require("../../routes/tamboRouter/controlVeterinarioRouter/controlVeterinarioRouter");
const controlLecheroRouter = require("../tamboRouter/controlLecheroRouter/controlLecheroRouter");
const informeRouter = require("../tamboRouter/informeRouter/informeRouter");

const tamboRouter = Router();
/* tamboRouter.post("/", postTamboMid, postTamboHandler);
tamboRouter.delete("/:id", deleteTamboHandler);
tamboRouter.put("/", putTamboHandler); */
tamboRouter.use("/ganado", ganadoRouter);
tamboRouter.use("/retiroleche", retiroLecheRouter);
tamboRouter.use("/produccionleche", produccionLecheRouter);
tamboRouter.use("/controlveterinario", controlVeterinarioRouter);
/* tamboRouter.use("/ventaleche", ventaLecheRouter); */
tamboRouter.use("/control", controlLecheroRouter);
tamboRouter.use("/informe", informeRouter)





module.exports = tamboRouter