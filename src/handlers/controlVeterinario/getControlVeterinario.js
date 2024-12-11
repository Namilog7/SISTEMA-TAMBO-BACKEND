const { ControlVeterinario } = require("../../db");

const getControlVeterinario = async (req, res) => {
    try {
        const response = await ControlVeterinario.findAll()
        return res.json(response)

    } catch (error) {
        console.log(error)
    }
}

module.exports = getControlVeterinario