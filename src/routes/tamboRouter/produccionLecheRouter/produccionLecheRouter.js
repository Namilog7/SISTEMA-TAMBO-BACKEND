const { Router } = require("express");
const postProduccionLecheHandler = require("../../../handlers/tambo/produccionLeche/postProduccionLecheHandler");
const getProduccionHandler = require("../../../handlers/tambo/produccionLeche/getProduccionLeche");
const deleteProduccionHandler = require("../../../handlers/tambo/produccionLeche/deleteProduccionHandler");
const putProduccionLecheHandler = require("../../../handlers/tambo/produccionLeche/putProduccionLecheHandler");
const getPartialProduccionLecheHandler = require("../../../handlers/tambo/produccionLeche/getPartialProduccionLeche");
const { recoleccionPostModel, recoleccionPutModel } = require("../../../middlewares/tambo/produccionLeche/postProduccionLecheMid")
const modelValidateMid = require("../../../middlewares/modelValidateMid");

const produccionLecheRouter = Router();
produccionLecheRouter.get("/", getProduccionHandler)
produccionLecheRouter.get("/parcial", getPartialProduccionLecheHandler)
produccionLecheRouter.post("/", modelValidateMid(recoleccionPostModel), postProduccionLecheHandler)
produccionLecheRouter.delete("/:id", deleteProduccionHandler) // endpoint que no se va a usar 
produccionLecheRouter.put("/", modelValidateMid(recoleccionPutModel), putProduccionLecheHandler)


module.exports = produccionLecheRouter