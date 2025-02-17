const { Insumo, Proveedor, ProveedorInsumo } = require("../../db");

const postInsumo = async ({ precio, nombre, stock, id_sector, ultimo_ingreso, tipo, id_proveedor }) => {
    // Verificar si el proveedor existe
    const sector_id = id_sector.replace(/"/g, "");
    const proveedor = await Proveedor.findByPk(sector_id);
    if (!proveedor) {
        throw new Error(`El proveedor con ID ${id_proveedor} no existe.`);
    }

    // Crear el insumo
    const nuevoInsumo = await Insumo.create({
        nombre,
        id_sector,
        tipo,
    });

    // Crear la relación en la tabla intermedia ProovedorInsumo con el precio
    await ProveedorInsumo.create({
        id_insumo: nuevoInsumo.id,
        id_proveedor,
        stock,
        precio,
        ultimo_ingreso,
    });

    // Retornar el insumo creado junto con su relación en la tabla intermedia
    return {
        mensaje: "Insumo creado exitosamente",
        insumo: nuevoInsumo,
        relacion: {
            id_proveedor,
            id_insumo: nuevoInsumo.id,
            precio,
        },
    };
};

module.exports = postInsumo;
