const { Router } = require("express");
const postProductoHandler = require("../../handlers/fabrica/postProductoHandler");
const getProductoHandler = require("../../handlers/fabrica/getProductoHandler");
const putProductoHandler = require("../../handlers/fabrica/putProductoHandler");
const deleteProductoHandler = require("../../handlers/fabrica/deleteProductoHandler");
const postRetiroLecheHandler = require("../../handlers/tambo/retiroLeche/postRetiroLecheHandler");
const postVentaProductoHandler = require("../../handlers/fabrica/postVentaProductoHandler");
const getCompraLecheHandler = require("../../handlers/fabrica/compraLecheHandler");
const getVentasProductosHandler = require("../../handlers/fabrica/getVentasProductoHandler");
const actualizarFabricaHandler = require("../../handlers/fabrica/actualizarFabrica");
const procesarTodos = require("../../handlers/fabrica/procesarTodos");

const fabricaRouter = Router();
fabricaRouter.get("/producto", getProductoHandler);
fabricaRouter.post("/producto", postProductoHandler);
fabricaRouter.put("/producto", putProductoHandler);
fabricaRouter.put("/actualizar-tanque-stock", actualizarFabricaHandler)
fabricaRouter.put("/carga-producion", procesarTodos)
fabricaRouter.delete("/producto/:id", deleteProductoHandler);
fabricaRouter.post("/compraleche", postRetiroLecheHandler);
fabricaRouter.get("/compraleche", getCompraLecheHandler);
fabricaRouter.post("/ventaproducto", postVentaProductoHandler);
fabricaRouter.get("/ventaproducto", getVentasProductosHandler);

module.exports = fabricaRouter;
