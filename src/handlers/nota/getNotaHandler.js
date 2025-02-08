const { Nota } = require("../../db");
const buildQueryFilters = require("../../controllers/buildQueryFilters");
const paginate = require("../../helpers/paginate")

const getNotaHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación
        const searchQuery = buildQueryFilters(Nota, req.query); // Construir los filtros de búsqueda

        // Obtener todos los registros que coincidan con los filtros
        const response = await Nota.findAll({
            where: searchQuery,
        });

        // Verificar si se encontraron registros
        if (response.length === 0) {
            return res.status(404).json({ message: "No existen registros para los filtros proporcionados." });
        }

        // Aplicar paginado
        const paginatedResult = paginate(response, page, limit);

        // Responder con la data paginada
        return res.status(200).json(paginatedResult);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

module.exports = getNotaHandler