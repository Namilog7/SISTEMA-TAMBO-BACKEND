const { Router } = require("express");
const retiroLecheHandler = require("../../handlers/retiroLeche/postRetiroLecheHandler");
const postRetiroLecheMid = require("../../middlewares/retiroLeche/postRetiroLecheMid");
const getRetiroLecheHandler = require("../../handlers/retiroLeche/getRetiroLecheHandler");
const getPartialRetiroLecheHandler = require("../../handlers/retiroLeche/getPartialRetiroLecheHandler");

const retiroLecheRouter = Router();
retiroLecheRouter.get("/", getRetiroLecheHandler)
retiroLecheRouter.get("/partial", getPartialRetiroLecheHandler)
retiroLecheRouter.post("/", postRetiroLecheMid, retiroLecheHandler);

module.exports = retiroLecheRouter