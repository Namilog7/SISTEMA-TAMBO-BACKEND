const { Router } = require("express");
const postControlVeterinario = require("../../../handlers/tambo/controlVeterinario/postControlVeterinario");
const getControlVeterinario = require("../../../handlers/tambo/controlVeterinario/getControlVeterinario");

const controlVeterinarioRouter = Router()
controlVeterinarioRouter.get("/", getControlVeterinario)
controlVeterinarioRouter.post("/", postControlVeterinario);


module.exports = controlVeterinarioRouter