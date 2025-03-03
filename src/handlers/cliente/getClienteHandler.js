const { Cliente } = require("../../db");

const getClienteHandler = async (req, res) => {
    const { id_sector } = req.params
    const id = id_sector.replace(/"/g, "");
    try {
        const clientes = await Cliente.findAll({
            where: {
                id_sector: id
            }
        })
        return res.json(clientes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getClienteHandler