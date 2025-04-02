const { EquipoFrio } = require("../../db");

const cambioLitros = async ({ litros }, transaction) => {
    if (litros <= 0) throw new Error("La cantidad de litros debe ser positiva");

    const equipoTambo = await EquipoFrio.findOne({
        where: { nombre: "Tambo" },
        transaction
    });

    const equipoFabrica = await EquipoFrio.findOne({
        where: { nombre: "Fabrica" },
        transaction
    });

    if (!equipoTambo) throw new Error("No existe el equipo Tambo");
    if (!equipoFabrica) throw new Error("No existe el equipo Fabrica");

    if (equipoTambo.litros < litros) {
        throw new Error("No hay suficientes litros en el equipo Tambo");
    }

    equipoFabrica.litros += Number(litros);
    equipoTambo.litros -= Number(litros);

    await equipoFabrica.save({ transaction });
    await equipoTambo.save({ transaction });

    return;
};

module.exports = cambioLitros;
