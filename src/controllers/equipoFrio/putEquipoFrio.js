const { EquipoFrio } = require("../../db");

const putEquipoFrio = async ({ nombre, litros, capacidad }) => {
    const equipo = await EquipoFrio.findOne({ where: { nombre } });
    equipo.litros += litros,
        equipo.capacidad = capacidad
}