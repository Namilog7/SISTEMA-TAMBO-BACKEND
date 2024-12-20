const { Router } = require("express");
const getTamboHandler = require("../../handlers/tambo/getTamboHandler");
/* const postTamboHandler = require("../../handlers/tambo/postTamboHandler");
const deleteTamboHandler = require("../../handlers/tambo/deleteTamboHandler");
const putTamboHandler = require("../../handlers/tambo/putTamboHandler");
const postTamboMid = require("../../middlewares/tambo/postTamboMid"); */
const ganadoRouter = require("../../routes/ganadoRouter/ganadoRouter");
const retiroLecheRouter = require("../../routes/retiroLecheRouter/retiroLecheRouter");
const produccionLecheRouter = require("../../routes/produccionLecheRouter/produccionLecheRouter");
const controlVeterinarioRouter = require("../../routes/controlVeterinarioRouter/controlVeterinarioRouter");
const insumoRouter = require("../../routes/insumoRouter/insumoRouter");
const ventaLecheRouter = require("../../routes/ventaLecheRouter/ventaLecheRouter");
const clienteLecheRouter = require("../../routes/clienteLecheRouter/clienteLecheRouter");
const controlLecheroRouter = require("../controlLecheroRouter/controlLecheroRouter");

const tamboRouter = Router();

tamboRouter.get("/", getTamboHandler);
/* tamboRouter.post("/", postTamboMid, postTamboHandler);
tamboRouter.delete("/:id", deleteTamboHandler);
tamboRouter.put("/", putTamboHandler); */
tamboRouter.use("/ganado", ganadoRouter);
tamboRouter.use("/retiroleche", retiroLecheRouter);
tamboRouter.use("/produccionleche", produccionLecheRouter);
tamboRouter.use("/controlveterinario", controlVeterinarioRouter);
tamboRouter.use("/insumo", insumoRouter);
tamboRouter.use("/ventaleche", ventaLecheRouter);
tamboRouter.use("/clienteleche", clienteLecheRouter);
tamboRouter.use("/control", controlLecheroRouter)




module.exports = tamboRouter