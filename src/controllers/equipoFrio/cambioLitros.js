const { EquipoFrio } = require("../../db");

const cambioLitros = async ({ litros }, transaction) => {
    const equipoTambo = await EquipoFrio.findOne({
        where: {
            nombre: "Tambo"
        }
    }, { transaction })
    const equipoFabrica = await EquipoFrio.findOne({
        where: {
            nombre: "Fabrica"
        }
    }, { transaction })
    if (!equipoTambo) throw new Error("No existe el equipo Tambo")
    if (!equipoFabrica) throw new Error("No existe el equipo Fabrica")
    equipoFabrica.litros += Number(litros)
    equipoTambo.litros -= Number(litros)

    equipoFabrica.save({ transaction })
    equipoTambo.save({ transaction })
    return
}

module.exports = cambioLitros