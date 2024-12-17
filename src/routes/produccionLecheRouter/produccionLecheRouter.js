const { Router } = require("express");
const postProduccionLecheHandler = require("../../handlers/produccionLeche/postProduccionLecheHandler");
const getProduccionHandler = require("../../handlers/produccionLeche/getProduccionLeche");
const deleteProduccionHandler = require("../../handlers/produccionLeche/deleteProduccionHandler");
const putProduccionLecheHandler = require("../../handlers/produccionLeche/putProduccionLecheHandler");
const getPartialProduccionLecheHandler = require("../../handlers/produccionLeche/getPartialProduccionLeche");
const postProduccionLecheMid = require("../../middlewares/produccionLeche/postProduccionLecheMid")

const produccionLecheRouter = Router();
produccionLecheRouter.get("/", getProduccionHandler)
produccionLecheRouter.get("/parcial", getPartialProduccionLecheHandler)
produccionLecheRouter.post("/", postProduccionLecheMid, postProduccionLecheHandler)
produccionLecheRouter.delete("/:id", deleteProduccionHandler) // endpoint que no se va a usar 
produccionLecheRouter.put("/", putProduccionLecheHandler)


module.exports = produccionLecheRouter