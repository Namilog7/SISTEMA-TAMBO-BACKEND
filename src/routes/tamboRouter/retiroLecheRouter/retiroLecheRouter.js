const { Router } = require("express");
const postRetiroLecheHandler = require("../../../handlers/tambo/retiroLeche/postRetiroLecheHandler");
const getRetiroLecheHandler = require("../../../handlers/tambo/retiroLeche/getRetiroLecheHandler");
const getPartialRetiroLecheHandler = require("../../../handlers/tambo/retiroLeche/getPartialRetiroLecheHandler");
const putRetiroLecheHandler = require("../../../handlers/tambo/retiroLeche/putRetiroLecheHandler");
const modelValidateMid = require("../../../middlewares/modelValidateMid")
const { postRetiroLecheModel, retiroLecheUpdateModel } = require("../../../middlewares/retiroLeche/postRetiroLecheMid");
const liquidacionRouter = require("../../liquidacion/liquidacionRouter");

const retiroLecheRouter = Router();
retiroLecheRouter.get("/", getRetiroLecheHandler);
retiroLecheRouter.get("/parcial", getPartialRetiroLecheHandler)
retiroLecheRouter.post("/", modelValidateMid(postRetiroLecheModel), postRetiroLecheHandler);
retiroLecheRouter.put("/", modelValidateMid(retiroLecheUpdateModel), putRetiroLecheHandler);
retiroLecheRouter.use("/liquidacion", liquidacionRouter)

module.exports = retiroLecheRouter