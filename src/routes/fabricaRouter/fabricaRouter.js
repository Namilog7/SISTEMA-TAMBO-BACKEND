const { Router } = require("express");
const postProductoHandler = require("../../handlers/fabrica/postProductoHandler");
const getProductoHandler = require("../../handlers/fabrica/getProductoHandler");
const putProductoHandler = require("../../handlers/fabrica/putProductoHandler");

const fabricaRouter = Router()
fabricaRouter.get("/producto", getProductoHandler)
fabricaRouter.post("/producto", postProductoHandler)
fabricaRouter.put("/producto", putProductoHandler)

module.exports = fabricaRouter