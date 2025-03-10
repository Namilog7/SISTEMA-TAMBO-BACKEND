const { Router } = require("express");
const postProductoHandler = require("../../handlers/fabrica/postProductoHandler");
const getProductoHandler = require("../../handlers/fabrica/getProductoHandler");
const putProductoHandler = require("../../handlers/fabrica/putProductoHandler");
const deleteProductoHandler = require("../../handlers/fabrica/deleteProductoHandler");
const postRetiroLecheHandler = require("../../handlers/tambo/retiroLeche/postRetiroLecheHandler");
const postVentaProductoHandler = require("../../handlers/fabrica/postVentaProductoHandler");

const fabricaRouter = Router()
fabricaRouter.get("/producto", getProductoHandler)
fabricaRouter.post("/producto", postProductoHandler)
fabricaRouter.put("/producto", putProductoHandler)
fabricaRouter.delete("/producto/:id", deleteProductoHandler)
fabricaRouter.post("/compraleche", postRetiroLecheHandler)
fabricaRouter.post("/ventaproducto", postVentaProductoHandler)

module.exports = fabricaRouter