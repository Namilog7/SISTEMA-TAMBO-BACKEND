const { ControlVeterinario } = require("../../../db");

const getControlVeterinario = async (req, res) => {
    try {
        const response = await ControlVeterinario.findAll()
        return res.json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Algo salio mal en la base de datos" })
    }
}

module.exports = getControlVeterinario