const { EquipoFrio } = require("../../../db");

const putEquipoFrioHandler = async (req, res) => {
    const { litros, capacidad, id } = req.body;

    try {
        let equipoFrio = await EquipoFrio.findOne({ where: { id } });

        if (!equipoFrio) {
            return res.status(404).json({ error: "Equipo frío no encontrado" });
        }

        equipoFrio.litros = Number(litros);
        if (capacidad) equipoFrio.capacidad = Number(capacidad);

        await equipoFrio.save();

        res.json({ message: "Equipo frío actualizado", equipoFrio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putEquipoFrioHandler;
