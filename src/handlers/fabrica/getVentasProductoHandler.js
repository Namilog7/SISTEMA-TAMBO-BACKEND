const { VentaProducto } = require("../../db");

const getVentasProductosHandler = async (req, res) => {
    try {
        const records = await VentaProducto.findAll();

        if (records.length === 0) {
            return res.status(404).json({ message: "No existen registros." });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.error("Error en getVentasProductosHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getVentasProductosHandler;
