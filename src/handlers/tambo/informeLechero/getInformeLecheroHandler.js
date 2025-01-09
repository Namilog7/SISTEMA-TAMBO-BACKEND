const getInformeLechero = require("../../../controllers/tambo/informeLechero/getInformeLechero");
const paginate = require("../../../helpers/paginate"); // Función paginadora reutilizable

const getInformeLecheroHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Obtener los datos desde el controlador
        const data = await getInformeLechero();

        // Aplicar paginación utilizando la función `paginate`
        const response = paginate(data, page, limit);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en getInformeLecheroHandler:", error);
        return res.status(500).json({ error: `Hubo un error en el servidor: ${error.message}` });
    }
};

module.exports = getInformeLecheroHandler;
