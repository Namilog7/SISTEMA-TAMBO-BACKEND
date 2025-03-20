const { EquipoFrio } = require("../../../db");

const getEquipoFrioHandler = async (req, res) => {
    try {
        const equipos = await EquipoFrio.findAll({});
        res.json(equipos)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getEquipoFrioHandler