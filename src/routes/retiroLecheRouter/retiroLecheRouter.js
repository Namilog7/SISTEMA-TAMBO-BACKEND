const { Router } = require("express");
const retiroLecheHandler = require("../../handlers/retiroLeche/postRetiroLecheHandler");
const postRetiroLecheMid = require("../../middlewares/retiroLeche/postRetiroLecheMid");
const getRetiroLecheHandler = require("../../handlers/retiroLeche/getRetiroLecheHandler");

const retiroLecheRouter = Router();
retiroLecheRouter.get("/", getRetiroLecheHandler)
retiroLecheRouter.post("/", postRetiroLecheMid, retiroLecheHandler);

module.exports = retiroLecheRouter