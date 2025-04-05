const { EquipoFrio } = require("../db");

const restarLitrosTanque = async ({ litro_variedad, cantidad }, transaction) => {
    const equipoFabrica = await EquipoFrio.findOne({
        where: { nombre: "Fabrica" },
        transaction
    })
    if (!equipoFabrica) throw new Error("No se encontro el equipo");
    let litrosUsados = Number(litro_variedad) * Number(cantidad);
    equipoFabrica.litros -= Number(litrosUsados)
    await equipoFabrica.save({ transaction })
    return
}
module.exports = restarLitrosTanque