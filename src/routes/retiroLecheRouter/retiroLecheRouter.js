const { Router } = require("express");
const retiroLecheHandler = require("../../handlers/retiroLeche/postRetiroLecheHandler");
const getRetiroLecheHandler = require("../../handlers/retiroLeche/getRetiroLecheHandler");
const getPartialRetiroLecheHandler = require("../../handlers/retiroLeche/getPartialRetiroLecheHandler");
const putRetiroLecheHandler = require("../../handlers/retiroLeche/putRetiroLecheHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const { postRetiroLecheModel, retiroLecheUpdateModel } = require("../../middlewares/retiroLeche/postRetiroLecheMid")

const retiroLecheRouter = Router();
retiroLecheRouter.get("/", getRetiroLecheHandler);
retiroLecheRouter.get("/parcial", getPartialRetiroLecheHandler)
retiroLecheRouter.post("/", modelValidateMid(postRetiroLecheModel), retiroLecheHandler);
retiroLecheRouter.put("/", modelValidateMid(retiroLecheUpdateModel), putRetiroLecheHandler);

module.exports = retiroLecheRouter