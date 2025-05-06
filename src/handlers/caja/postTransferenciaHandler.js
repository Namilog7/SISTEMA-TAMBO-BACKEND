const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");


const postTransferenciaHandler = async (req, res) => {
    const {
        fecha,
        tipo,
        importe,
        detalle,
        id_cuenta,
        id_cuenta_destino
    } = req.body
    try {
        const nuevaTransferencia = await postTransferencia({
            fecha,
            tipo,
            importe,
            detalle,
            id_cuenta,
            id_cuenta_destino
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