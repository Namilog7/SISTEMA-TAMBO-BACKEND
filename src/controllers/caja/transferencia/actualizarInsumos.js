const { ProveedorInsumo, Proveedor, Insumo } = require("../../../db");

const actualizarInsumo = async ({ productos, id_sector_imputado, id_proveedor, razon_social, fecha }, transaction) => {
    let proveedorExistente;
    console.log("id prov", id_proveedor);
    if (id_proveedor) {
        const proveedor = await Proveedor.findOne({
            where: { id: id_proveedor },
            transaction,
        });
        proveedorExistente = proveedor;
    }

    if (!proveedorExistente) {
        console.log("No se selecciono un proveedor proveedorExistente, se creara uno nuevo");
    }
    console.log("sector inputado: ", id_sector_imputado);

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

        let proveedorInsumo;
        if (proveedorExistente) {
            const prov = await ProveedorInsumo.findOne({
                where: {
                    id_insumo: insumo.id,
                    id_proveedor: id_proveedor,
                },
                transaction,
            });
            proveedorInsumo = prov;
        }

        console.log("Proveedor Insumo encontrado:", proveedorInsumo);

        if (proveedorInsumo) {
            proveedorInsumo.stock += Number(cantidad);
            proveedorInsumo.precio = precio;
            await proveedorInsumo.save({ transaction });
            console.log("Proveedor Insumo EDITADO:", proveedorInsumo);
        } else {
            if (proveedorExistente) {
                proveedorInsumo = await ProveedorInsumo.create(
                    {
                        id_insumo: insumo.id,
                        id_proveedor: proveedorExistente.id,
                        stock: cantidad,
                        precio: precio,
                        ultimo_ingreso: fecha,
                    },
                    { transaction }
                );
            } else {
                const nuevoProv = await Proveedor.create(
                    {
                        nombre_empresa: razon_social,
                        contacto_1: "-",
                        contacto_2: "-",
                        localidad: "-",
                        saldo: 0,
                        id_sector: id_sector_imputado,
                    },
                    { transaction }
                );

                proveedorInsumo = await ProveedorInsumo.create(
                    {
                        id_insumo: insumo.id,
                        id_proveedor: nuevoProv.id,
                        stock: cantidad,
                        precio: precio,
                        ultimo_ingreso: fecha,
                    },
                    { transaction }
                );
            }
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
