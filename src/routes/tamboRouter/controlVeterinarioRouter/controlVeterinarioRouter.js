const { Router } = require("express");
const postControlVeterinario = require("../../../handlers/controlVeterinario/postControlVeterinario");
const getControlVeterinario = require("../../../handlers/controlVeterinario/getControlVeterinario");

const controlVeterinarioRouter = Router()
controlVeterinarioRouter.get("/", getControlVeterinario)
controlVeterinarioRouter.post("/", postControlVeterinario);


module.exports = controlVeterinarioRouter