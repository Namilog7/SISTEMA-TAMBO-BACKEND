const express = require("express");
const postEmpleadoHandler = require("../../handlers/user/admin/postEmpleadoHandler");
const verifyToken = require("../../middlewares/user/verifyToken");
const loginUser = require("../../middlewares/user/authenticateUser");
const userRouter = express.Router();

userRouter.post("/login", loginUser)
userRouter.post("/crear-empleado", verifyToken("ADMIN"), postEmpleadoHandler)

module.exports = router;
