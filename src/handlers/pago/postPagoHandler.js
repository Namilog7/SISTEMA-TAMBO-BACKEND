const postMetodosPago = require("../../controllers/pago/postMetodosPago");
const { conn } = require("../../db");

const postPagoHandler = async (req, res) => {
    const { detalle, fecha, id_cliente, id_proveedor, metodos } = req.body
    const transaction = await conn.transaction()
    try {
        const nuevoPago = await postMetodosPago({ metodos, fecha, id_cliente, id_proveedor, detalle }, transaction)
        return res.json({
            message: "Se creo el nuevo pago",
            nuevoPago
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postPagoHandler 