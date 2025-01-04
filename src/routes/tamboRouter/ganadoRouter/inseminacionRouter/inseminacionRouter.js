const { Router } = require("express");
const postInseminacionHandler = require("../../../../handlers/ganado/inseminacion/postInseminacionHandler");
const getInseminacionHandler = require("../../../../handlers/ganado/inseminacion/getInseminacionHandler");

const inseminacionRouter = Router()

inseminacionRouter.get("/", getInseminacionHandler)
inseminacionRouter.post("/", postInseminacionHandler)

module.exports = inseminacionRouter