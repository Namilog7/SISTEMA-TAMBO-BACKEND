const { Ganado } = require("../../db");
const buildQueryFilters = require("../../controllers/buildQueryFilters");
const getGanado = require("../../controllers/ganado/getGanado")


const getGanadoHandler = async (req, res) => {
    const searchQuery = buildQueryFilters(Ganado, req.query)
    try {
        let response
        if (Object.keys(req.query).length !== 0) {
            response = await Ganado.findAll({ where: searchQuery })
            if (response.length == 0) {
                response = { message: "No existen esos registros" }
                return res.status(404).json(response)
            }
            return res.status(200).json(response)
        } else
            response = await getGanado()
        return res.status(200).json(response)
    } catch (error) {
        console.error("Error en getTamboHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
}
module.exports = getGanadoHandler