const crudController = require("../../controllers/crudController");
const { Proovedor } = require("../../db");

const getProovedorHandler = async (req, res) => {
    const getProovedor = crudController(Proovedor);
    try {
        const response = await getProovedor.readAll()
        return res.json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` })
    }
}

module.exports = getProovedorHandler