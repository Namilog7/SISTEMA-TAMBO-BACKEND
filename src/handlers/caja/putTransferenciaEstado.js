const { Transferencia } = require("../../db");

const putTransferenciaHandler = async (req, res) => {
    const { id } = req.params
    const { estado, detalle } = req.body

    try {
        const updateTransferencia = await Transferencia.update({
            estado, detalle,
            where: { id }
        })
        res.json({
            message: `Se actualizo el estado de la transferencia`,
            updateTransferencia
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = putTransferenciaHandler