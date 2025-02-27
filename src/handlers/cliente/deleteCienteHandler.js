const { Cliente } = require("../../db");

const deleteClienteHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteCliete = await Cliente.destroy({
            where: {
                id: id
            }
        })
        res.json({
            message: "Se elimino al cliente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteClienteHandler