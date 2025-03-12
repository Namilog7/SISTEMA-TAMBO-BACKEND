const { Transferencia } = require("../../db");

const putTransferenciaHandler = async (req, res) => {
    const { id } = req.params
    const { estado, detalle, importe } = req.body

    try {
        const updateTransferencia = await Transferencia.update({
            estado, detalle,
            where: { id }
        })
        let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
        if (estado === "ACREDITADO" || estado === "CONFIRMADA" || estado === "COBRADO") {
            registroCaja = await registrarSaldoBancario({ estado, importe })
        }
        res.json({
            message: `Se actualizo el estado de la transferencia`,
            updateTransferencia,
            registroCaja
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = putTransferenciaHandler