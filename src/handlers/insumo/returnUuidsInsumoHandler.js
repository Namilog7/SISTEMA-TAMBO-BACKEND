const { Insumo } = require("../../db"); // Importa tu modelo de Insumo
const buildQueryFilters = require("../../controllers/buildQueryFilters"); // Para los filtros dinámicos
const paginate = require("../../helpers/paginate"); // Helper para paginación

const getAllInsumosHandler = async (req, res) => {
    // Extraer parámetros de paginación y filtros de la query
    const { page = 1, limit = 10, ...query } = req.query;

    try {
        // Construir filtros dinámicos utilizando buildQueryFilters
        const filters = buildQueryFilters(Insumo, query);

        // Consultar la base de datos con filtros
        const data = await Insumo.findAll({ where: filters });

        // Aplicar paginación a los datos obtenidos
        const response = await paginate(data, page, limit);

        // Responder con los datos paginados
        res.status(200).json(response);
    } catch (error) {
        console.error("Error en getAllInsumosHandler:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getAllInsumosHandler;
