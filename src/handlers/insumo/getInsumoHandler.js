const getInsumo = require("../../controllers/insumo/getInsumo");
const paginate = require("../../helpers/paginate"); // Importa tu función paginate

const getInsumoHandler = async (req, res) => {
    const { id } = req.params;
    const id_sector = parseInt(id);

    // Extraer parámetros de paginación de la query
    const { page = 1, limit = 10 } = req.query;

    try {
        // Obtener los datos paginados
        const response = await paginate(getInsumo, page, limit, id_sector);

        // Responder con los datos paginados
        res.status(200).json(response);
    } catch (error) {
        console.error("Error en getInsumoHandler:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getInsumoHandler;
