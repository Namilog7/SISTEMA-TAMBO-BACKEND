const { EquipoFrio } = require("../../../db");

const putEquipoFrioHandler = async (req, res) => {
    const { litros, capacidad } = req.body
    try {
        let litrosActuales = await EquipoFrio.findOne({});
        litrosActuales.litros += litros;
        litrosActuales.capacidad = capacidad
        litros.save()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = putEquipoFrioHandler