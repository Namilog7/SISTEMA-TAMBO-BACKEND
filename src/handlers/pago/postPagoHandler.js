const { Pago } = require("../../db");

const postPagoHandler = async (req, res) => {
    const { detalle, fecha, id_cliente, id_proveedor } = req.body
    try {
        const newPago = await Pago.create({
            detalle,
            fecha,
            id_cliente,
            id_proveedor
        })
        res.json({
            message: "Se creo el nuevo pago",
            newPago
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postPagoHandler 