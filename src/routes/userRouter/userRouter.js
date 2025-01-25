const express = require("express");
const authenticateUser = require("../../middlewares/user/authenticateUser");
const postEmpleadoHandler = require("../../handlers/user/admin/postEmpleadoHandler");
const router = express.Router();

router.post("/login", authenticateUser)
router.post("/crear-empleado", postEmpleadoHandler)

module.exports = router;
