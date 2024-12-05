const { Router } = require("express")
const getGanadoHandler = require("../../handlers/ganado/getGanadoHandler")

const ganadoRouter = Router()
ganadoRouter.get("/", getGanadoHandler)




module.exports = ganadoRouter