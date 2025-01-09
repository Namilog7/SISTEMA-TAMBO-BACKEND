const crudController = require("../../../../controllers/crudController");
const { Liquidacion } = require("../../../../db");
const paginate = require("../../../../utils/paginate"); // Función paginadora reutilizable

const getLiquidacionHandler = async (req, res) => {
    const getLiquidacion = crudController(Liquidacion);

    try {
        const { page = 1, limit = 10 } = req.query;

        // Obtener todas las liquidaciones
        const liquidaciones = await getLiquidacion.readAll();

        // Aplicar la paginación
        const response = paginate(liquidaciones, page, limit);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error en getLiquidacionHandler:", error);
        return res
            .status(500)
            .json({ error: `Hubo un problema en el servidor: ${error.message}` });
    }
};

module.exports = getLiquidacionHandler;
