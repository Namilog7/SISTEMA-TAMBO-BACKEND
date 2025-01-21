const { RetiroLeche, Empleado } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const postRetiroLecheHandler = async (req, res) => {
    const {
        cantidad,
        fecha,
        liquidado,
        hora_carga,
        hora_retiro,
        encargado_retiro,
        aclaracion,
        id_empleado,
        estado,
        id_cliente,
        id_liquidacion,
    } = req.body;

    const postRetiroLeche = crudController(RetiroLeche);

    try {
        // Buscar el empleado por el ID proporcionado en usuario_carga
        const empleado = await Empleado.findByPk(id_empleado);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        // Construir el nombre completo del empleado
        const usuario_carga = empleado.nombre_completo;

        // Crear el registro en RetiroLeche con el nombre completo del empleado
        const response = await postRetiroLeche.create({
            cantidad,
            fecha,
            liquidado,
            hora_carga,
            hora_retiro,
            encargado_retiro,
            aclaracion,
            usuario_carga,
            estado,
            id_cliente,
            id_liquidacion,
        });

        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear el retiro de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postRetiroLecheHandler;
