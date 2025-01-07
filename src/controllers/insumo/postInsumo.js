const { Insumo, Proovedor, ProovedorInsumo } = require("../../db");

const postInsumo = async ({ precio, nombre, stock, id_sector, ultimo_ingreso, tipo, id_proovedor }) => {
    // Verificar si el proveedor existe
    const proveedor = await Proovedor.findByPk(id_proovedor);
    if (!proveedor) {
        throw new Error(`El proveedor con ID ${id_proovedor} no existe.`);
    }

    // Crear el insumo
    const nuevoInsumo = await Insumo.create({
        nombre,
        id_sector,
        tipo,
    });

    // Crear la relación en la tabla intermedia ProovedorInsumo con el precio
    await ProovedorInsumo.create({
        id_insumo: nuevoInsumo.id,
        id_proovedor,
        stock,
        precio,
        ultimo_ingreso,
    });

    // Retornar el insumo creado junto con su relación en la tabla intermedia
    return {
        mensaje: "Insumo creado exitosamente",
        insumo: nuevoInsumo,
        relacion: {
            id_proovedor,
            id_insumo: nuevoInsumo.id,
            precio,
        },
    };
};

module.exports = postInsumo;
