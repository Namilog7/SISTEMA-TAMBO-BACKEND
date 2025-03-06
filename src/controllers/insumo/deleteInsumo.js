const { Insumo } = require("../../db");

const deleteInsumo = async ({ id_sector, id }) => {
    const userId = id.replace(/"/g, "");
    const sectorId = id_sector.replace(/"/g, "");
    const insumo = await Insumo.findOne({
        where: {
            id: userId,
            id_sector: sectorId
        },
    });

    if (!insumo) {
        throw new Error(`No se encontró un insumo con el ID ${id} en el sector ${id_sector}.`);
    }
    await insumo.destroy();

    return {
        message: `El insumo con ID ${id} del sector ${id_sector} ha sido eliminado correctamente.`,
    };
};

module.exports = deleteInsumo;
