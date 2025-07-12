const postTransferencia = require("../../controllers/caja/transferencia/postTransferencia");
const { conn } = require("../../db");

const postTransferenciaHandler = async (req, res) => {
    const transaction = await conn.transaction();
    const { fecha, tipo, importe, estado, detalle, id_origen, id_destino, nombre_origen, nombre_destino } = req.body;
    try {
        const nuevaTransferencia = await postTransferencia(
            {
                fecha,
                tipo,
                importe,
                estado,
                detalle,
                id_origen,
                id_destino,
                nombre_origen,
                nombre_destino,
            },
            transaction
        );
        await transaction.commit();
        res.json({
            nuevaTransferencia,
        });
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};
module.exports = postTransferenciaHandler;
