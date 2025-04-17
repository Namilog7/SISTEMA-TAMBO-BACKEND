const getCasaPropietario = require("../../controllers/casa/getCasaPropietario");


const getCasaPropietarioHandler = async (req, res) => {

    try {
        const casas = await getCasaPropietario()
        res.json(casas)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getCasaPropietarioHandler