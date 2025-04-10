const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");


const postTransferenciaHandler = async (req, res) => {
    const {
        fecha,
        cuenta_origen,
        cuenta_destino,
        importe,
        detalle,
        estado,
        tipo
    } = req.body
    try {
        const nuevaTransferencia = await postTransferencia({
            fecha,
            cuenta_origen,
            cuenta_destino,
            importe,
            detalle,
            estado,
            tipo
        })
        res.json({
            nuevaTransferencia
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = postTransferenciaHandler