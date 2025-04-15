const { CompromisoDePago } = require("../../db");

const postPagoEventualHandler = async (req, res) => {
    const { nombre_servicio, fecha, cuotas, id_propietario } = req.body
    try {
        const nuevoPago = await CompromisoDePago.create({ nombre_servicio, cuotas, fecha, id_propietario, eventual: true })
        res.json(nuevoPago)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = postPagoEventualHandler