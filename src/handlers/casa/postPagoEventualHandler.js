const crudController = require("../../controllers/crudController");
const { CasaPagoEventual } = require("../../db");

const postPagoEventualHandler = async (req, res) => {
    const { descripcion, monto_pagado, fecha, id_propietario } = req.body
    const pagoEventual = crudController(CasaPagoEventual)
    try {
        const nuevoPago = await pagoEventual.create({ descripcion, monto_pagado, fecha, id_propietario })
        res.json(nuevoPago)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = postPagoEventualHandler