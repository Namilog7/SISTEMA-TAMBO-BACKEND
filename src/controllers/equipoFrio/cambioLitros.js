const { EquipoFrio } = require("../../db");

const cambioLitros = async ({ litros }, transaction) => {
    const equipoTambo = await EquipoFrio.findOne({
        where: {
            nombre: "Tambo"
        }
    })
    const equipoFabrica = await EquipoFrio.findOne({
        where: {
            nombre: "Fabrica"
        }
    })
    if (!equipoTambo) throw new Error("No existe el equipo")
    equipoFabrica.litros += Number(litros)
    equipoTambo.litros -= Number(litros)
    equipoFabrica.save({ transaction })
    equipoTambo.save({ transaction })
}

module.exports = cambioLitros