const { Venta, Producto } = require("../../db");

const getVentasProductosHandler = async (req, res) => {
    try {
        // const records = await VentaProducto.findAll();

        // if (records.length === 0) {
        //     return res.status(404).json({ message: "No existen registros." });
        // }

        const venta = await Venta.findAll({
            include: [
                {
                    model: Producto,
                    through: {
                        attributes: ["cantidad", "importe_total", "precio_unidad"], // campos de la tabla intermedia
                    },
                    attributes: ["nombre"], // campos del producto que querés traer
                },
            ],
        });

        return res.status(200).json(venta);
    } catch (error) {
        console.error("Error en getVentasProductosHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getVentasProductosHandler;
