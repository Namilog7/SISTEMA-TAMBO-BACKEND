const { VentaProducto, Venta } = require("../../db");
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const postMetodoGastoIngreso = require("../../controllers/caja/postMetodoGastoIngreso");

const postVentaProductoHandler = async (req, res) => {
    const { monto, fecha, arrayObjsVenta, id_cliente, id_sector, metodosPago, tipo = "INGRESO" } = req.body;

    try {
        if (!fecha || !arrayObjsVenta?.length) {
            throw new Error("Proporcione todos los datos");
        }

        const venta = await Venta.create({ fecha, monto, id_cliente });

        const bulkVenta = arrayObjsVenta.map(({ cantidad, precio, id }) => ({
            cantidad,
            precio,
            id_venta: venta.id,
            id_producto: id
        }));

        await VentaProducto.bulkCreate(bulkVenta);

        const { newGastoIngreso } = await postGastoIngreso({
            detalle: `Venta ID :${venta.id}`,
            tipo,
            fecha,
            id_sector
        });

        let metodosRegistrados = [];

        if (Array.isArray(metodosPago) && metodosPago.length > 0) {
            for (const metodo of metodosPago) {
                const metodoRegistrado = await postMetodoGastoIngreso({
                    id_gasto_ingreso: newGastoIngreso.id,
                    metodo: metodo.metodo,
                    importe: metodo.importe
                });
                metodosRegistrados.push(metodoRegistrado);
            }
        }

        res.json({
            message: "Venta registrada exitosamente",
            venta,
            productosVendidos: bulkVenta,
            gastoIngreso: newGastoIngreso,
            metodosPago: metodosRegistrados
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaProductoHandler;
