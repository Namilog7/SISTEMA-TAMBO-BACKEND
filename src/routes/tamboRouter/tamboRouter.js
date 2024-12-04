const { Router } = require("express");
const getTamboHandler = require("../../handlers/tambo/getTamboHandler");
const postTamboHandler = require("../../handlers/tambo/postTamboHandler");
const deleteTamboHandler = require("../../handlers/tambo/deleteTamboHandler");
const putTamboHandler = require("../../handlers/tambo/putTamboHandler")

const tamboRouter = Router();

tamboRouter.get("/", getTamboHandler);
tamboRouter.post("/", postTamboHandler)
tamboRouter.delete("/", deleteTamboHandler);
tamboRouter.put("/", putTamboHandler);



module.exports = tamboRouter