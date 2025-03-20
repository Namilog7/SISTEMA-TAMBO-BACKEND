const { EquipoFrio } = require("../../db");

const putEquipoFrio = async ({ nombre, litros, capacidad }, transaction) => {
    const equipo = await EquipoFrio.findOne({ where: { nombre } }, { transaction });
    equipo.litros += litros,
        equipo.capacidad = capacidad ? capacidad : equipo.capacidad,
        await equipo.save({ transaction })
}

module.exports = putEquipoFrio