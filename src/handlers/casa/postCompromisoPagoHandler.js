const postCompromiso = require("../../controllers/casa/postCompromiso");

const postCompromisoPagoHandler = async (req, res) => {
    const { nombre_servicio, fecha, id_propietario } = req.body

    try {
        const nuevoCompromiso = await postCompromiso({ nombre_servicio, fecha, id_propietario })
        res.json(nuevoCompromiso)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = postCompromisoPagoHandler