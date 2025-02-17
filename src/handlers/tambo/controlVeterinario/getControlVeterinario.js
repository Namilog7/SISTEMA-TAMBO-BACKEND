const { ControlVeterinario } = require("../../../db");

const getControlVeterinario = async (req, res) => {
    try {
        const response = await ControlVeterinario.findAll();
        const caravanas = response.map(control => control.caravana);
        return res.json({
            response,
            caravanas
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al obtener los controles" });
    }
}

module.exports = getControlVeterinario;
