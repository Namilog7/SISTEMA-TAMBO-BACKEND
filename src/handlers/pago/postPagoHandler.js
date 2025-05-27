const postMetodosPago = require("../../controllers/pago/postMetodosPago");
const { conn } = require("../../db");

const postPagoHandler = async (req, res) => {
    const { detalle, fecha, id_cliente, id_proveedor, id_empleado, metodos, model, id_sector } = req.body;
    const transaction = await conn.transaction();
    try {
        const nuevoPago = await postMetodosPago(
            { metodos, fecha, id_cliente, id_proveedor, id_empleado, detalle, model, id_sector },
            transaction
        );
        await transaction.commit();
        return res.json({
            message: "Se creo el nuevo pago",
            nuevoPago,
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postPagoHandler;
