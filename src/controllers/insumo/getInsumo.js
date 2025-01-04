const { Insumo, Proovedor, ProovedorInsumo } = require("../../db");

const getInsumo = async (id_sector) => {
    try {
        const insumos = await Insumo.findAll({
            where: { id_sector },
            include: [
                {
                    model: Proovedor,
                    attributes: { exclude: [] }, // Incluye todos los atributos de Proovedor
                    through: {
                        model: ProovedorInsumo, // Referencia explícita a la tabla intermedia
                        attributes: ["precio"], // Incluye el campo `precio` de la tabla intermedia
                    },
                },
            ],
        });

        if (!insumos.length) {
            return { message: "No hay registros" };
        }

        return insumos;
    } catch (error) {
        console.error("Error al obtener los insumos:", error);
        throw new Error("No se pudieron obtener los insumos");
    }
};

module.exports = getInsumo;
