const { ProveedorInsumo, Proveedor, Insumo } = require("../../../db");

const actualizarInsumo = async ({ productos, id_sector_imputado, id_proveedor, razon_social, fecha }, transaction) => {
    try {
        let proveedorExistente;
        console.log("id_proveedor recibido:", id_proveedor);

        if (id_proveedor) {
            proveedorExistente = await Proveedor.findOne({
                where: { id: id_proveedor },
                transaction,
            });
        }

        if (!proveedorExistente) {
            console.log("No se seleccionó un proveedor existente, se creará uno nuevo");
        }

        console.log("ID sector imputado:", id_sector_imputado);

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
                console.log(`Insumo creado: ${insumo.nombre}`);
            }

            let proveedorInsumo;

            if (proveedorExistente) {
                proveedorInsumo = await ProveedorInsumo.findOne({
                    where: {
                        id_insumo: insumo.id,
                        id_proveedor: proveedorExistente.id,
                    },
                    transaction,
                });
            }

            console.log("ProveedorInsumo encontrado:", proveedorInsumo);

            if (proveedorInsumo) {
                proveedorInsumo.stock += Number(cantidad);
                proveedorInsumo.precio = precio;
                await proveedorInsumo.save({ transaction });
                console.log("ProveedorInsumo actualizado:", proveedorInsumo);
            } else {
                if (!proveedorExistente) {
                    proveedorExistente = await Proveedor.create(
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
                    console.log("Proveedor creado:", proveedorExistente.nombre_empresa);
                }

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
                console.log("ProveedorInsumo creado:", proveedorInsumo.id);
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

        console.log("Insumos procesados:", insumosProcesados);
        return insumosProcesados;

    } catch (error) {
        console.error("Error en actualizarInsumo:", error);
        throw error; // Propagamos el error para que el handler o middleware superior lo maneje
    }
};

module.exports = actualizarInsumo;
