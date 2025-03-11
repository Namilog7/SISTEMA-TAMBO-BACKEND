const { Cheque } = require("../../db");

const putChequeHandler = async (req, res) => {
    const { id } = req.params;
    const { estado, detalle } = req.body;
    try {

        const cheque = await Cheque.findByPk(id);
        if (!cheque) {
            return res.status(404).json({ message: "Cheque no encontrado" });
        }

        if (estado !== undefined) cheque.estado = estado;
        if (detalle !== undefined) cheque.detalle = detalle;

        await cheque.save();

        res.json({
            message: "Cheque actualizado exitosamente",
            cheque
        });

    } catch (error) {
        console.error("Error en putChequeHandler:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = putChequeHandler;
