const { Router } = require("express");
const getLoteHandler = require("../../handlers/agricultura/getLoteHandler");
const postLoteHandler = require("../../handlers/agricultura/postLoteHandler");
const putLoteHandler = require("../../handlers/agricultura/putLoteHandler");
const deleteLoteHandler = require("../../handlers/agricultura/deleteLoteHandler");
const postEstadoHandler = require("../../handlers/agricultura/postEstadoHandler");
const deleteEstadoHandler = require("../../handlers/agricultura/deleteEstadoHandler");
const getLoteByIdHandler = require("../../handlers/agricultura/getLoteByIdHandler");
const postRolloHandler = require("../../handlers/agricultura/postRolloHandler");
const postVentaRolloHandler = require("../../handlers/agricultura/postVentaRolloHandler");
const putRolloHandler = require("../../handlers/agricultura/putRolloHandler");
const postMovimientoRolloHandler = require("../../handlers/agricultura/postMovimientoRolloHandler");

const agriculturaRouter = Router();
agriculturaRouter.get("/", getLoteHandler);
agriculturaRouter.get("/:id", getLoteByIdHandler)
agriculturaRouter.post("/", postLoteHandler);
agriculturaRouter.put("/", putLoteHandler);
agriculturaRouter.delete("/:id", deleteLoteHandler);
agriculturaRouter.post("/estado", postEstadoHandler)
agriculturaRouter.delete("/estado/:id", deleteEstadoHandler)
agriculturaRouter.post("/rollo", postRolloHandler)
agriculturaRouter.put("/rollo", putRolloHandler)
agriculturaRouter.post("/movimiento-rollo", postMovimientoRolloHandler)
agriculturaRouter.post("/venta-rollo", postVentaRolloHandler)


module.exports = agriculturaRouter