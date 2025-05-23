const { MesesCompromiso, conn } = require("../../db");
const crudController = require("../../controllers/crudController");

const postMesesPagoHandler = async (req, res) => {
    const { id_compromiso, monto, fecha } = req.body;
    const transaction = await conn.transaction();
    const postMesesPago = crudController(MesesCompromiso);
    try {
        if (!id_compromiso) {
            return res.json({ message: "necesito un compromiso valido" });
        }
        const nuevoPago = await postMesesPago.create(
            { id_compromiso, monto, fecha, estado_pago: "PAGADO" },
            { transaction }
        );
        await transaction.commit();
        res.json(nuevoPago);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postMesesPagoHandler;
