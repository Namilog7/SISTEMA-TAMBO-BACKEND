const { ProduccionLeche, Empleado } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche);
    const { litros, fecha, hora_recoleccion, hora_carga, id_empleado, cantidad_animales, aclaracion, estado } = req.body;

    try {
        // Verificar que el empleado exista
        const userId = id_empleado.replace(/"/g, "");
        const empleado = await Empleado.findByPk(userId);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        // Construir el nombre completo
        const usuario_carga = empleado.nombre_completo;

        // Crear el registro en ProduccionLeche
        const response = await postProduccionLeche.create({
            litros,
            fecha,
            hora_recoleccion,
            hora_carga,
            usuario_carga,
            cantidad_animales,
            aclaracion,
            estado,
        });

        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear la producción de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postProduccionLecheHandler;
