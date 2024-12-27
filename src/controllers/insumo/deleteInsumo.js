const { Insumo } = require("../../db");

const deleteInsumo = async ({ id_sector, id }) => {
    if (!id || !id_sector) {
        throw new Error("Se requieren los campos 'id_sector' e 'id' para realizar el borrado.");
    }

    const insumo = await Insumo.findOne({
        where: {
            id,
            id_sector,
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
