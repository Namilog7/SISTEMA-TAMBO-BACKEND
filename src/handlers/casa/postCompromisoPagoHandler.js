const crudController = require("../../controllers/crudController");
const { CompromisoDePago } = require("../../db");

const postCompromisoPagoHandler = async (req, res) => {
    const { nombre_servicio, monto_pagado, estado_pago, fecha, id_propietario } = req.body
    const postCompromiso = crudController(CompromisoDePago);

    try {
        const nuevoCompromiso = await postCompromiso.create({ nombre_servicio, monto_pagado, estado_pago, fecha, id_propietario })
        res.json(nuevoCompromiso)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postCompromisoPagoHandler