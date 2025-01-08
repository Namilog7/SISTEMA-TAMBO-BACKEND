const { Router } = require("express");
const postInseminacionHandler = require("../../../../handlers/tambo/ganado/inseminacion/postInseminacionHandler");
const getInseminacionHandler = require("../../../../handlers/tambo/ganado/inseminacion/getInseminacionHandler");

const inseminacionRouter = Router()

inseminacionRouter.get("/", getInseminacionHandler)
inseminacionRouter.post("/", postInseminacionHandler)

module.exports = inseminacionRouter