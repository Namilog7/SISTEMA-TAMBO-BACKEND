const postCheque = require("../../controllers/caja/cheque/postCheque")
const { conn } = require("../../db");

const postChequeHandler = async (req, res) => {
    const {
        importe,
        estado,
        detalle,
        destino,
        banco,
        numero_cheque,
        fecha_emision,
        fecha_pago
    } = req.body
    try {
        const transaction = await conn.transaction()
        const nuevoCheque = await postCheque({
            importe,
            estado,
            detalle,
            destino,
            banco,
            numero_cheque,
            fecha_emision,
            fecha_pago
        }, transaction)
        await transaction.commit()
        res.json({
            nuevoCheque
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postChequeHandler