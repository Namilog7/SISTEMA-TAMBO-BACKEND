const { Router } = require("express");
const retiroLecheHandler = require("../../handlers/retiroLeche/postRetiroLecheHandler");
const getRetiroLecheHandler = require("../../handlers/retiroLeche/getRetiroLecheHandler");
const getPartialRetiroLecheHandler = require("../../handlers/retiroLeche/getPartialRetiroLecheHandler");
const putRetiroLecheHandler = require("../../handlers/retiroLeche/putRetiroLecheHandler");
const modelValidateMid = require("../../middlewares/modelValidateMid")
const { postRetiroLecheModel, retiroLecheUpdateModel } = require("../../middlewares/retiroLeche/postRetiroLecheMid");
const liquidacionRouter = require("../liquidacion/liquidacionRouter");

const retiroLecheRouter = Router();
retiroLecheRouter.get("/", getRetiroLecheHandler);
retiroLecheRouter.get("/parcial", getPartialRetiroLecheHandler)
retiroLecheRouter.post("/", modelValidateMid(postRetiroLecheModel), retiroLecheHandler);
retiroLecheRouter.put("/", modelValidateMid(retiroLecheUpdateModel), putRetiroLecheHandler);
retiroLecheRouter.use("/liquidacion", liquidacionRouter)

module.exports = retiroLecheRouter