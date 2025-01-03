const { Insumo, Proovedor } = require("../../db");

const getInsumo = async (id_sector) => {
    const insumos = await Insumo.findAll({
        where: { id_sector },
        include: [
            {
                model: Proovedor,
                attributes: ["nombre", "contacto_1", "contacto_2", "localidad"],
                through: {
                    attributes: ["precio"]
                },
            },
        ],
    });

    if (!insumos.length) {
        return { message: "No hay registros" };
    }

    return insumos;
};

module.exports = getInsumo;
