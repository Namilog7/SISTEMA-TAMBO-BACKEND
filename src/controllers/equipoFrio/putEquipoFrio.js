const { EquipoFrio } = require("../../db");

const putEquipoFrio = async ({ nombre, litros, capacidad, operacion }, transaction) => {
    const equipo = await EquipoFrio.findOne({ where: { nombre } }, { transaction });
    console.log("datos recibidos:", nombre, operacion);

    if (!equipo) {
        throw new Error(`No se encontró un equipo con el nombre: ${nombre}`);
    }

    if (operacion === "+") {
        equipo.litros += litros;
    } else if (operacion === "-") {
        if (equipo.litros < litros) {
            throw new Error(
                `No se puede restar ${litros} litros, el equipo solo tiene ${equipo.litros} litros disponibles.`
            );
        }
        equipo.litros -= litros;
    } else {
        throw new Error("Operación inválida. Use '+' o '-'.");
    }

    if (capacidad) {
        equipo.capacidad = capacidad;
    }

    await equipo.save({ transaction });
};

module.exports = putEquipoFrio;
