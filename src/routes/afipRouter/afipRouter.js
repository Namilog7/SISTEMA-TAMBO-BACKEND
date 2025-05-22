const { Router } = require("express");
const postFacturaHandler = require("../../handlers/afip/postFacturaHandler");

const afipRouter = Router();

afipRouter.post("/", postFacturaHandler)



module.exports = afipRouter