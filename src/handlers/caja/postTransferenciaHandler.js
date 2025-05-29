const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");
const { conn } = require("../../db");

const postTransferenciaHandler = async (req, res) => {
    const transaction = await conn.transaction()
    const {
        fecha,
        tipo,
        importe,
        estado,
        detalle,
        id_cuenta,
        id_cuenta_destino
    } = req.body
    try {
        const nuevaTransferencia = await postTransferencia({
            fecha,
            tipo,
            importe,
            estado,
            detalle,
            id_cuenta,
            id_cuenta_destino
        })
        await transaction.commit()
        res.json({
            nuevaTransferencia
        })
    } catch (error) {
        console.log(error);
        await transaction.rollback()
        res.status(500).json({ error: error.message })
    }
}
module.exports = postTransferenciaHandler