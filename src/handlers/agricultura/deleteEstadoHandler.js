const { EstadoSiembra } = require("../../db");

const deleteEstadoHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteEstado = await EstadoSiembra.destroy({
            where: id
        })
        res.json({ message: `Se elimino ${deleteEstado} registro` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteEstadoHandler