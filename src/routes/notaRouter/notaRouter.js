const { Router } = require("express");
const postNotaHandler = require("../../handlers/nota/postNotaHandler");
const getNotaHandler = require("../../handlers/nota/getNotaHandler");
const getNotasHandler = require("../../handlers/nota/getNotasHandler");

const notaRouter = Router();
notaRouter.get("/", getNotasHandler)
notaRouter.get("/:id_afectado", getNotaHandler);
notaRouter.post("/", postNotaHandler)

module.exports = notaRouter