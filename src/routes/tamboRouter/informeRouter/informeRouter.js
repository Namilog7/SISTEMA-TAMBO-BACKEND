const { Router } = require("express");
const getInformeLecheroHandler = require("../../../handlers/tambo/informeLechero/getInformeLecheroHandler");

const informeRouter = Router()
informeRouter.get("/", getInformeLecheroHandler);


module.exports = informeRouter