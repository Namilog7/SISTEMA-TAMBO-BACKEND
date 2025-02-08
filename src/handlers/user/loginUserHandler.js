const loginUser = require("../../controllers/user/loginUser")

const loginUserHandler = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await loginUser(email, password)
        const { nombre } = userExist
        res.json({
            message: "Usuario Creado",
            nombre
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = loginUserHandler