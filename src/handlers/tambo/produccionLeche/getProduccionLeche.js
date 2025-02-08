const { ProduccionLeche } = require("../../../db");
const crudController = require("../../../controllers/crudController");
const buildQueryFilters = require("../../../controllers/buildQueryFilters");

const getProduccionHandler = async (req, res) => {
    const getProduccionLeche = crudController(ProduccionLeche)
    try {
        const searchQuery = buildQueryFilters(ProduccionLeche, req.query)
        let response
        if (Object.keys(req.query).length !== 0) {
            response = await ProduccionLeche.findAll({ where: searchQuery })
            if (response.length == 0) {
                response = { message: "No existen esos registros" }
                return res.status(404).json(response)
            }
            return res.status(200).json(response)
        } else
            response = await getProduccionLeche.readAll()
        return res.status(200).json(response)
    } catch (error) {
        console.error("Error en ProduccionLecheHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}
module.exports = getProduccionHandler