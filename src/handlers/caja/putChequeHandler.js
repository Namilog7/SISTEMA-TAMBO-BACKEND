const { Cheque } = require("../../db");
const registrarSaldoBancario = require("../../helpers/registrarSaldoBancario")

const putChequeHandler = async (req, res) => {
    const { id } = req.params;
    const { estado, detalle, importe } = req.body;
    try {

        const cheque = await Cheque.findByPk(id);
        if (!cheque) {
            return res.status(404).json({ message: "Cheque no encontrado" });
        }

        if (estado !== undefined) cheque.estado = estado;
        if (detalle !== undefined) cheque.detalle = detalle;

        await cheque.save();

        let registroCaja = { message: `Se agrego la transferencia con el estado ${estado}` }
        if (estado === "ACREDITADO" || estado === "CONFIRMADA" || estado === "COBRADO") {
            registroCaja = await registrarSaldoBancario({ estado, importe })
        }

        res.json({
            message: "Cheque actualizado exitosamente",
            cheque,
            registroCaja
        });

    } catch (error) {
        console.error("Error en putChequeHandler:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = putChequeHandler;
