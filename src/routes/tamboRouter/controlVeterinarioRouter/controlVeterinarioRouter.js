const { Router } = require("express");
const { postControlVeterinario, upload } = require("../../../handlers/tambo/controlVeterinario/postControlVeterinario");
const getControlVeterinario = require("../../../handlers/tambo/controlVeterinario/getControlVeterinario");

const controlVeterinarioRouter = Router()
controlVeterinarioRouter.get("/", getControlVeterinario)
controlVeterinarioRouter.post(
    "/control-veterinario",
    upload.single("file"), // 'file' es el nombre del campo en multipart/form-data
    postControlVeterinario
);


module.exports = controlVeterinarioRouter