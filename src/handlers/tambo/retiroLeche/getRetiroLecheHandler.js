const { RetiroLeche } = require("../../../db");
const buildQueryFilters = require("../../../controllers/buildQueryFilters");
const paginate = require("../../../helpers/paginate"); // Importa la función de paginación

const getRetiroLecheHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Parámetros de paginación
        const searchQuery = buildQueryFilters(RetiroLeche, req.query); // Construir filtros de búsqueda

        // Utilizar la función paginate
        const response = await paginate(RetiroLeche, { where: searchQuery }, page, limit);

        if (response.data.length === 0) {
            return res.status(404).json({ message: "No existen registros." });
        }

        // Responder con los datos paginados
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en getRetiroLecheHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getRetiroLecheHandler;
