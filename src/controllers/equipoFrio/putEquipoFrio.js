const { EquipoFrio } = require("../../db");

const putEquipoFrio = async ({ nombre, litros, capacidad, operacion }, transaction) => {
    const equipo = await EquipoFrio.findOne({ where: { nombre } }, { transaction });
    if (operacion === "+") {
        equipo.litros += litros,
            equipo.capacidad = capacidad ? capacidad : equipo.capacidad,
            await equipo.save({ transaction })
    }
    if (operacion === "-") {
        equipo.litros -= litros,
            equipo.capacidad = capacidad ? capacidad : equipo.capacidad,
            await equipo.save({ transaction })
    }
}

module.exports = putEquipoFrio