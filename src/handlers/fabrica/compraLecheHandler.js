const { CompraLeche } = require("../../db");

const getCompraLecheHandler = async (req, res) => {
    try {
        const compraLeche = await CompraLeche.findAll({})
        res.json(compraLeche)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCompraLecheHandler