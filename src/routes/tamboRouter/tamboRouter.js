const { Router } = require("express");
const getTamboHandler = require("../../handlers/tambo/getTamboHandler");
/* const postTamboHandler = require("../../handlers/tambo/postTamboHandler");
const deleteTamboHandler = require("../../handlers/tambo/deleteTamboHandler");
const putTamboHandler = require("../../handlers/tambo/putTamboHandler");
const postTamboMid = require("../../middlewares/tambo/postTamboMid"); */
const ganadoRouter = require("../../routes/tamboRouter/ganadoRouter/ganadoRouter");
const retiroLecheRouter = require("../tamboRouter/ventaLecheRouter/ventaLecheRouter");
const produccionLecheRouter = require("../../routes/tamboRouter/produccionLecheRouter/produccionLecheRouter");
const controlVeterinarioRouter = require("../../routes/tamboRouter/controlVeterinarioRouter/controlVeterinarioRouter");
const ventaLecheRouter = require("../../routes/tamboRouter/ventaLecheRouter/ventaLecheRouter");
const clienteLecheRouter = require("../../routes/tamboRouter/clienteLecheRouter/clienteLecheRouter");
const controlLecheroRouter = require("../tamboRouter/controlLecheroRouter/controlLecheroRouter");
const informeRouter = require("../tamboRouter/informeRouter/informeRouter");

const tamboRouter = Router();

tamboRouter.get("/", getTamboHandler);
/* tamboRouter.post("/", postTamboMid, postTamboHandler);
tamboRouter.delete("/:id", deleteTamboHandler);
tamboRouter.put("/", putTamboHandler); */
tamboRouter.use("/ganado", ganadoRouter);
tamboRouter.use("/retiroleche", retiroLecheRouter);
tamboRouter.use("/produccionleche", produccionLecheRouter);
tamboRouter.use("/controlveterinario", controlVeterinarioRouter);
tamboRouter.use("/ventaleche", ventaLecheRouter);
tamboRouter.use("/clienteleche", clienteLecheRouter);
tamboRouter.use("/control", controlLecheroRouter);
tamboRouter.use("/informe", informeRouter)





module.exports = tamboRouter