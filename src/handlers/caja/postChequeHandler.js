const postCheque = require("../../controllers/caja/cheque/postCheque")

const postChequeHandler = async (req, res) => {
    const {
        importe,
        estado,
        tipo,
        detalle,
        origen,
        destino,
        actual_destino,
        banco,
        numero_cheque,
        fecha_emision,
        fecha_pago,
        fecha_cobro
    } = req.body
    try {
        const nuevoCheque = await postCheque({
            importe,
            estado,
            tipo,
            detalle,
            origen,
            destino,
            actual_destino,
            banco,
            numero_cheque,
            fecha_emision,
            fecha_pago,
            fecha_cobro
        })
        res.json({
            nuevoCheque
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postChequeHandler