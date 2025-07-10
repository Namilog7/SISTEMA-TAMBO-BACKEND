const getInsumo = require("../../controllers/insumo/getInsumo");
const paginate = require("../../helpers/paginate");
const buildQueryFilters = require("../../controllers/buildQueryFilters");
const { Insumo } = require("../../db");

const getInsumoHandler = async (req, res) => {
    const { id_sector } = req.params;

    // Extraer parámetros de paginación y filtros de la query
    const { page = 1, limit = 10, ...query } = req.query;

    try {
        // Construir filtros usando la función buildQueryFilters
        const filters = buildQueryFilters(Insumo, query);

        // Agregar el filtro por id_sector si está presente
        if (id_sector) {
            filters.id_sector = id_sector;
        }

        // Obtener los datos filtrados
        const data = await getInsumo(id_sector);

        // Paginar los datos obtenidos
        const response = await paginate(data, page, limit);

        // Responder con los datos paginados
        res.status(200).json({ data });
    } catch (error) {
        console.error("Error en getInsumoHandler:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getInsumoHandler;
