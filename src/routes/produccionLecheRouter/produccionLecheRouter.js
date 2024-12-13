const { Router } = require("express");
const postProduccionLecheHandler = require("../../handlers/produccionLeche/postProduccionLecheHandler");
const getProduccionHandler = require("../../handlers/produccionLeche/getProduccionLeche");
const deleteProduccionHandler = require("../../handlers/produccionLeche/deleteProduccionHandler");
const putProduccionLecheHandler = require("../../handlers/produccionLeche/putProduccionLecheHandler");
const getPartialProduccionLecheHandler = require("../../handlers/produccionLeche/getPartialProduccionLeche");

const produccionLecheRouter = Router();
produccionLecheRouter.get("/", getProduccionHandler)
produccionLecheRouter.get("/partial", getPartialProduccionLecheHandler)
produccionLecheRouter.post("/", postProduccionLecheHandler)
produccionLecheRouter.delete("/", deleteProduccionHandler)
produccionLecheRouter.put("/", putProduccionLecheHandler)


module.exports = produccionLecheRouter