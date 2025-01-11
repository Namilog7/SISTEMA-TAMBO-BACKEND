const getInsumo = require("../../controllers/insumo/getInsumo");
const paginate = require("../../helpers/paginate");

const getInsumoHandler = async (req, res) => {
    const { id_sector } = req.query;
    console.log(id_sector)

    // Extraer parámetros de paginación de la query
    const { page = 1, limit = 10 } = req.query;

    try {
        // Obtener los datos paginados
        const data = await getInsumo(id_sector)
        const response = await paginate(data, page, limit);

        // Responder con los datos paginados
        res.status(200).json(response);
    } catch (error) {
        console.error("Error en getInsumoHandler:", error);
        res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};

module.exports = getInsumoHandler;
