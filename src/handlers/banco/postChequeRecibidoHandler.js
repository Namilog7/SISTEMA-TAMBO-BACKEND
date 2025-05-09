const { ChequeRecibido } = require("../../db");
const crudController = require("../../controllers/crudController");

const postChequeRecibidoHandler = async (req, res) => {
    const { importe, detalle, origen, destino, banco, numero_cheque, fecha_emision, fecha_pago } = req.body
    const postCheque = crudController(ChequeRecibido);

    try {
        const nuevoCheque = await postCheque.create({ importe, detalle, origen, destino, banco, numero_cheque, fecha_emision, fecha_pago })
        res.json(nuevoCheque)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postChequeRecibidoHandler