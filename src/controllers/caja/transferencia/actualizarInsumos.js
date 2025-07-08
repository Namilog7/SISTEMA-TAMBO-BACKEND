const { ProveedorInsumo, Proveedor, Insumo } = require("../../../db");

const actualizarInsumo = async ({ productos, id_sector_imputado, razon_social }, transaction) => {
    const proveedor = await Proveedor.findOne({
        where: { nombre_empresa: razon_social },
        transaction,
    });

    if (!proveedor) {
        throw new Error(`Proveedor con razón social "${razon_social}" no encontrado`);
    }

    const insumosProcesados = [];

    for (const producto of productos) {
        const { id_producto, descripcion, cantidad, precio, unidad, iva, total } = producto;

        let insumo = null;

        if (id_producto) {
            insumo = await Insumo.findByPk(id_producto, { transaction });
        }


        if (!insumo) {
            insumo = await Insumo.create(
                {
                    nombre: descripcion,
                    id_sector: id_sector_imputado,
                },
                { transaction }
            );
        }

        let proveedorInsumo = await ProveedorInsumo.findOne({
            where: {
                id_insumo: insumo.id,
                id_proveedor: proveedor.id,
            },
            transaction,
        });

        if (proveedorInsumo) {
            proveedorInsumo.stock += cantidad;
            proveedorInsumo.precio = precio;
            await proveedorInsumo.save({ transaction });
        } else {
            proveedorInsumo = await ProveedorInsumo.create(
                {
                    id_insumo: insumo.id,
                    id_proveedor: proveedor.id,
                    stock: cantidad,
                    precio: precio,
                },
                { transaction }
            );
        }

        insumosProcesados.push({
            insumo,
            cantidad,
            unidad,
            precio,
            iva,
            total,
        });
    }

    return insumosProcesados;
};

module.exports = actualizarInsumo;
