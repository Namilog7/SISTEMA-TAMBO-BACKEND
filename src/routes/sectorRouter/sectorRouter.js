const { Router } = require("express");
const getSectorHandler = require("../../handlers/sector/getSectorHandler");

const sectorRouter = Router();

sectorRouter.get("/", getSectorHandler)

module.exports = sectorRouter