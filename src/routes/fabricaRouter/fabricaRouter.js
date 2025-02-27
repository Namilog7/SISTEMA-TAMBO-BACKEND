const { Router } = require("express");
const postProductoHandler = require("../../handlers/fabrica/postProductoHandler");
const getProductoHandler = require("../../handlers/fabrica/getProductoHandler");
const putProductoHandler = require("../../handlers/fabrica/putProductoHandler");
const deleteProductoHandler = require("../../handlers/fabrica/deleteProductoHandler");
const postRetiroLecheHandler = require("../../handlers/tambo/retiroLeche/postRetiroLecheHandler");

const fabricaRouter = Router()
fabricaRouter.get("/producto", getProductoHandler)
fabricaRouter.post("/producto", postProductoHandler)
fabricaRouter.put("/producto", putProductoHandler)
fabricaRouter.delete("/producto/:id", deleteProductoHandler)
fabricaRouter.post("/compraleche", postRetiroLecheHandler)

module.exports = fabricaRouter