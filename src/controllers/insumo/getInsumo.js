const { Insumo, Proveedor, ProveedorInsumo } = require("../../db");

const getInsumo = async (id_sector) => {
    try {
        const insumos = await Insumo.findAll({
            where: { id_sector: id_sector },
            include: [
                {
                    model: Proveedor,
                    attributes: { exclude: [] }, // Incluye todos los atributos de Proovedor
                    through: {
                        model: ProveedorInsumo, // Referencia explícita a la tabla intermedia
                        attributes: ["precio", "stock", "ultimo_ingreso"], // Incluye el campo `precio` de la tabla intermedia
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
