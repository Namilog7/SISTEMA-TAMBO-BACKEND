const { Router } = require("express");
const { postControlVeterinario, upload } = require("../../../handlers/tambo/controlVeterinario/postControlVeterinario");
const getControlVeterinario = require("../../../handlers/tambo/controlVeterinario/getControlVeterinario");

const controlVeterinarioRouter = Router()
controlVeterinarioRouter.get("/", getControlVeterinario)
controlVeterinarioRouter.post("/upload", postControlVeterinario);


module.exports = controlVeterinarioRouter