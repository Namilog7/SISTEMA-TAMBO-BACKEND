const getControlLechero = require("../../../controllers/tambo/controlLechero/getControlLechero");
const paginate = require("../../../helpers/paginate"); // Función paginadora reutilizable

const getInformeLecheroHandler = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Obtener todos los registros usando la función del controlador
        const data = await getControlLechero();

        // Utilizar la función paginadora para construir la respuesta
        const response = paginate(data, page, limit);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener los informes lecheros:", error);
        return res.status(500).json({ message: "Error al obtener los informes lecheros", error });
    }
};

module.exports = getInformeLecheroHandler;
