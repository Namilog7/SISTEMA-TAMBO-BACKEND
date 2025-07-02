const realizarArqueo = require("../../controllers/caja/realizarArqueo");

const getArqueoHandler = async (req, res) => {
    const { desde, hasta } = req.body
    try {
        const arqueo = await realizarArqueo({ desde, hasta })
        res.json(arqueo)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getArqueoHandler