const { Router } = require("express");
const getInformeLecheroHandler = require("../../../handlers/informeLechero/getInformeLecheroHandler");

const informeRouter = Router()
informeRouter.get("/", getInformeLecheroHandler);


module.exports = informeRouter