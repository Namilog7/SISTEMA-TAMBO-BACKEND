const loginUser = require("../../controllers/user/loginUser")

const loginUserHandler = async (req, res) => {
    const { user, password } = req.body
    try {
        const userExist = await loginUser(user, password)
        const { username } = userExist
        res.json({
            message: "Usuario Creado",
            username
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = loginUserHandler