const crudController = require("../../controllers/crudController");
const { Tambo } = require("../../db");
const buildQueryFilters = require("../../controllers/buildQueryFilters");

const getTamboHandler = async (req, res) => {
    const tamboCrud = crudController(Tambo)
    const searchQuery = buildQueryFilters(Tambo, req.query)
    try {
        let response
        if (Object.keys(req.query).length !== 0) {
            console.log(Object.keys(req.query))
            response = await Tambo.findAll({ where: searchQuery })
            if (response.length == 0) {
                response = { message: "No existen esos registros" }
                return res.status(404).json(response)
            }
            return res.status(200).json(response)
        } else
            response = await tamboCrud.readAll()
        return res.status(200).json(response)
    } catch (error) {
        console.error("Error en getTamboHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}

module.exports = getTamboHandler