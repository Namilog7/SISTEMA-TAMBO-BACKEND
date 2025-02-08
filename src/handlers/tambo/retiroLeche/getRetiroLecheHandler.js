const { RetiroLeche } = require("../../../db");
const buildQueryFilters = require("../../../controllers/buildQueryFilters");

const getRetiroLecheHandler = async (req, res) => {
    try {
        // Construir los filtros de búsqueda
        const searchQuery = buildQueryFilters(RetiroLeche, req.query);

        // Obtener todos los registros que coincidan con los filtros
        const records = await RetiroLeche.findAll({ where: searchQuery });

        if (records.length === 0) {
            return res.status(404).json({ message: "No existen registros." });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.error("Error en getRetiroLecheHandler:", error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getRetiroLecheHandler;
