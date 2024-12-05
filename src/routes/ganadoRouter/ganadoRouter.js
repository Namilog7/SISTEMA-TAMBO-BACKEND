const { Router } = require("express");
const getGanadoHandler = require("../../handlers/ganado/getGanadoHandler");
const postGanadoHandler = require("../../handlers/ganado/postGanadoHandler");
const deleteGanadoHandler = require("../../handlers/ganado/deleteGanadoHandler");
const putGanadoHandler = require("../../handlers/ganado/putGanadoHandler");

const ganadoRouter = Router()
ganadoRouter.get("/", getGanadoHandler);
ganadoRouter.post("/", postGanadoHandler);
ganadoRouter.delete("/:id", deleteGanadoHandler);
ganadoRouter.put("/", putGanadoHandler)



module.exports = ganadoRouter