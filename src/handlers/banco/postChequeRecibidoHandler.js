const { ChequeRecibido, conn } = require("../../db");
const crudController = require("../../controllers/crudController");

const postChequeRecibidoHandler = async (req, res) => {
    const { importe, detalle, origen, destino, banco, numero_cheque, fecha_emision, fecha_pago } = req.body;
    const postCheque = crudController(ChequeRecibido);

    const transaction = await conn.transaction();

    try {
        const nuevoCheque = await postCheque.create(
            {
                importe,
                detalle,
                origen,
                destino,
                banco,
                numero_cheque,
                fecha_emision,
                fecha_pago,
            },
            { transaction }
        );

        await transaction.commit();

        res.json(nuevoCheque);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postChequeRecibidoHandler;
