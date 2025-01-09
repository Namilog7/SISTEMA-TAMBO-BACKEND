const getInformeLechero = require("../../../controllers/tambo/informeLechero/getInformeLechero")

const getInformeLecheroHandler = async (req, res) => {
    try {
        const response = await getInformeLechero()
        return res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = getInformeLecheroHandler