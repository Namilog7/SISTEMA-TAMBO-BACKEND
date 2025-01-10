const { Router } = require("express");
const postNotaHandler = require("../../handlers/nota/postNotaHandler");
const getNotaHandler = require("../../handlers/nota/getNotaHandler");

notaRouter = Router();
notaRouter.get("/", getNotaHandler)
notaRouter.post("/", postNotaHandler)

module.exports = notaRouter