const { Ganado, ControlVeterinario, Inseminacion, InseminacionGanado } = require("../../../db");
const buildQueryFilters = require("../../../controllers/buildQueryFilters");
const paginate = require("../../../helpers/paginate"); // Importar la función de paginado

const getGanadoHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación
        const searchQuery = buildQueryFilters(Ganado, req.query); // Construir los filtros de búsqueda

        // Obtener todos los registros que coincidan con los filtros
        const response = await Ganado.findAll({
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
        console.error("Error en getGanadoHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getGanadoHandler;

