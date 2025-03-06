const { Router } = require("express");
const getLoteHandler = require("../../handlers/agricultura/getLoteHandler");
const postLoteHandler = require("../../handlers/agricultura/postLoteHandler");
const putLoteHandler = require("../../handlers/agricultura/putLoteHandler");
const deleteLoteHandler = require("../../handlers/agricultura/deleteLoteHandler");
const postEstadoHandler = require("../../handlers/agricultura/postEstadoHandler");
const deleteEstadoHandler = require("../../handlers/agricultura/deleteEstadoHandler");
const getLoteByIdHandler = require("../../handlers/agricultura/getLoteByIdHandler")

const agriculturaRouter = Router();
agriculturaRouter.get("/", getLoteHandler);
agriculturaRouter.get("/", getLoteByIdHandler)
agriculturaRouter.post("/", postLoteHandler);
agriculturaRouter.put("/", putLoteHandler);
agriculturaRouter.delete("/:id", deleteLoteHandler);
agriculturaRouter.post("/estado", postEstadoHandler)
agriculturaRouter.delete("/estado/:id", deleteEstadoHandler)


module.exports = agriculturaRouter