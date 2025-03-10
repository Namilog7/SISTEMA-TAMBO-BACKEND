const { VentaProducto, Venta, GastoIngreso } = require("../../db");

const postVentaProductoHandler = async (req, res) => {
    const { importe_total, fecha, arrayObjsVenta } = req.body;

    try {
        if (!importe_total || !fecha || !arrayObjsVenta?.length) {
            throw new Error("Proporcione todos los datos");
        }

        const venta = await Venta.create({ fecha, importe_total });

        const bulkVenta = arrayObjsVenta.map(({ cantidad, precio, id }) => ({
            cantidad,
            precio,
            id_venta: venta.id,
            id_producto: id
        }));

        await VentaProducto.bulkCreate(bulkVenta);

        res.json({
            message: "Venta y productos creados exitosamente",
            venta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postVentaProductoHandler;
