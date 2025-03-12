const crudController = require("../../../controllers/crudController");
const { User } = require("../../../db");

const deleteEmpleadoHandler = async (req, res) => {
    const userDelete = crudController(User)
    const { email } = req.body
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.json({ message: "No existe el usuario" })
        }
        const empleado = await userDelete.destroy({ where: { id: user.id } })
        res.json({
            message: `Datos actualizados ${empleado} eliminado`
        })
    } catch (error) {
        console.error({ error: error.message })
        res.status(500).json({ error: "Ocurrio un problema en el servidor" })
    }
}

module.exports = deleteEmpleadoHandler