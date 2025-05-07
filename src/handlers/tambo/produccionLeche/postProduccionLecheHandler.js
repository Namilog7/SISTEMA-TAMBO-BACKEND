const { ProduccionLeche, User, conn } = require("../../../db");
const crudController = require("../../../controllers/crudController");
const putEquipoFrio = require("../../../controllers/equipoFrio/putEquipoFrio");
const postSistemaMovimiento = require("../../../controllers/sistema_movimiento/postSistemaMovimiento");
const sistemaMovimientoObj = require("../../../helpers/SistemaMovimientoObj");

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche);
    const { litros, fecha, hora_recoleccion, hora_carga, id_empleado, cantidad_animales, aclaracion, estado } =
        req.body;

    try {
        const transaction = await conn.transaction();
        const userId = id_empleado.replace(/"/g, "");
        const empleado = await User.findByPk(userId, { transaction });
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        const response = await postProduccionLeche.create({
            litros,
            fecha,
            hora_recoleccion,
            hora_carga,
            cantidad_animales,
            aclaracion,
            estado,
            id_empleado: userId,
        });

        await putEquipoFrio({ nombre: "Tambo", litros: litros, operacion: "+" });
        await postSistemaMovimiento(
            {
                user_tipo: empleado.role,
                nombre_sector: "tambo",
                movimiento: sistemaMovimientoObj.cargaProduccion,
                fecha: new Date(),
            },
            transaction
        );
        await transaction.commit();
        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear la producción de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postProduccionLecheHandler;
