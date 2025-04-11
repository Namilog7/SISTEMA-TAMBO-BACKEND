const { MesesPago } = require("../../db");
const crudController = require("../../controllers/crudController");

const postMesesPagoHandler = async (req, res) => {
    const { id_compromiso, monto_pagado, fecha } = req.body
    const postMesesPago = crudController(MesesPago);
    try {
        const nuevoPago = await postMesesPago.create({ id_compromiso, monto_pagado, fecha })
        req.json(nuevoPago)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = postMesesPagoHandler