const { Cliente } = require("../../db");

const getClienteHandler = async (req, res) => {
    const { id_sector } = req.params
    const { id_cliente } = req.query
    const id = id_sector.replace(/"/g, "");
    try {
        let clientes;

        if (id_cliente) {
            clientes = await Cliente.findOne({
                where: { id: id_cliente }
            });
        } else {
            clientes = await Cliente.findAll({
                where: { id_sector: id }
            });
        }

        return res.json(clientes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getClienteHandler