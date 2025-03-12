const { VentaProducto, Venta, conn } = require("../../db");
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");

const postVentaProductoHandler = async (req, res) => {
    const { monto, fecha, arrayObjsVenta, id_cliente, id_sector, metodosPago, tipo = "INGRESO" } = req.body;
    const transaction = await conn.transaction()
    try {
        if (!fecha || !arrayObjsVenta?.length) {
            throw new Error("Proporcione todos los datos");
        }

        const venta = await Venta.create({ fecha, monto, id_cliente }, { transaction });

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
        }, transaction);

        const metodos = await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)

        res.json({
            message: "Venta registrada exitosamente",
            venta,
            productosVendidos: bulkVenta,
            gastoIngreso: newGastoIngreso,
            metodosPago: metodos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaProductoHandler;
