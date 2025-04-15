const getCasaPropietario = require("../../controllers/casa/getCasaPropietario");


const getCasaPropietarioHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const casas = await getCasaPropietario(id)
        res.json(casas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCasaPropietarioHandler