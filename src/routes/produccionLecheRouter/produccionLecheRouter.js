const { Router } = require("express");
const postProduccionLecheHandler = require("../../handlers/produccionLeche/postProduccionLecheHandler");
const getProduccionHandler = require("../../handlers/produccionLeche/getProduccionLeche");
const deleteProduccionHandler = require("../../handlers/produccionLeche/deleteProduccionHandler");
const putProduccionLecheHandler = require("../../handlers/produccionLeche/putProduccionLecheHandler");
const getPartialProduccionLecheHandler = require("../../handlers/produccionLeche/getPartialProduccionLeche");
const { recoleccionPostModel, recoleccionPutModel } = require("../../middlewares/produccionLeche/postProduccionLecheMid")
const modelValidateMid = require("../../middlewares/modelValidateMid");

const produccionLecheRouter = Router();
produccionLecheRouter.get("/", getProduccionHandler)
produccionLecheRouter.get("/parcial", getPartialProduccionLecheHandler)
produccionLecheRouter.post("/", modelValidateMid(recoleccionPostModel), postProduccionLecheHandler)
produccionLecheRouter.delete("/:id", deleteProduccionHandler) // endpoint que no se va a usar 
produccionLecheRouter.put("/", modelValidateMid(recoleccionPutModel), putProduccionLecheHandler)


module.exports = produccionLecheRouter