const { ProovedorInsumo, Insumo } = require("../../db");

const putInsumo = async (obj) => {
    const { id, id_proovedor, precio, stock, ultimo_ingreso, tipo } = obj;


    // Actualizar los campos en la tabla intermedia
    const [rowsUpdatedIntermedia] = await ProovedorInsumo.update(
        { precio, stock, ultimo_ingreso },
        {
            where: {
                id_insumo: id,
                id_proovedor: id_proovedor,
            },
        }
    );

    if (rowsUpdatedIntermedia === 0) {
        throw new Error(`No se encontró la relación entre el insumo con ID ${id} y el proveedor con ID ${id_proovedor}.`);
    }

    // Si se proporciona un tipo, actualizar el modelo Insumo
    if (tipo) {
        const [rowsUpdatedInsumo] = await Insumo.update(
            { tipo },
            {
                where: { id },
            }
        );

        if (rowsUpdatedInsumo === 0) {
            throw new Error(`No se pudo encontrar el insumo con ID ${id} para actualizar el tipo.`);
        }
    }

    return {
        message: "Se actualizaron los datos en la tabla ProovedorInsumo y, si se proporcionó, el tipo del insumo.",
        updatedFields: {
            id_insumo: id,
            id_proovedor,
            precio,
            stock,
            ultimo_ingreso,
            tipo: tipo || "No modificado",
        },
    };
};

module.exports = putInsumo;
