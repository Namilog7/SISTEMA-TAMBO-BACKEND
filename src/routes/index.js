const { Router } = require("express");
const tamboRouter = require("./tamboRouter/tamboRouter")

const router = Router();

router.use("/tambo", tamboRouter)


module.exports = router