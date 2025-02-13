const { Router } = require("express");
const postInseminacionHandler = require("../../../../handlers/tambo/ganado/inseminacion/postInseminacionHandler");
const getInseminacionHandler = require("../../../../handlers/tambo/ganado/inseminacion/getInseminacionHandler");
const getPartialInseminacion = require("../../../../handlers/tambo/ganado/inseminacion/getPartialInseminacion");


const inseminacionRouter = Router()

inseminacionRouter.get("/", getInseminacionHandler)
inseminacionRouter.post("/", postInseminacionHandler)
inseminacionRouter.get("/partial", getPartialInseminacion)

module.exports = inseminacionRouter