const { Transferencia } = require("../../db");
const registrarSaldoBancario = require("../../helpers/registrarSaldoBancario");

const putTransferenciaHandler = async (req, res) => {
    const { id } = req.params;
    const { estado, detalle } = req.body;

    try {
        const transferencia = await Transferencia.findByPk(id);
        if (!transferencia) {
            return res.status(404).json({ error: "Transferencia no encontrada" });
        }

        if (estado !== undefined) transferencia.estado = estado;
        if (detalle !== undefined) transferencia.detalle = detalle;


        let registroCaja = { message: `Se actualizó la transferencia con estado ${estado}` };

        if (estado === "ACEPTADA") {
            registroCaja = await registrarSaldoBancario({
                estado,
                importe: transferencia.importe,
            });
        }

        await transferencia.save();

        res.json({
            message: "Se actualizó el estado de la transferencia",
            transferencia,
            registroCaja,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = putTransferenciaHandler;
