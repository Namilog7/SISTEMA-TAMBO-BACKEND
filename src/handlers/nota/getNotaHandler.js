const { Nota } = require("../../db");

const getNotaHandler = async (req, res) => {
    const { id_afectado } = req.params
    try {
        const notas = await Nota.findAll({
            where: {
                id_afectado: id_afectado
            }
        })
        res.json({
            message: "Estas son las notas que tiene el cliente",
            notas
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getNotaHandler