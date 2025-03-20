const { ProduccionLeche, User, EquipoFrio, conn } = require("../../../db");
const crudController = require("../../../controllers/crudController");

const postProduccionLecheHandler = async (req, res) => {
    const postProduccionLeche = crudController(ProduccionLeche);
    const equipoFrio = crudController(EquipoFrio);
    const { litros, fecha, hora_recoleccion, hora_carga, id_empleado, cantidad_animales, aclaracion, estado } = req.body;

    try {

        const transaction = await conn.transaction()
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
            id_empleado: userId
        },);

        let litrosEnEquipo
        litrosEnEquipo = await EquipoFrio.findOne({ where: { nombre: "Tambo" } }, { transaction })
        if (!litrosEnEquipo) {
            litrosEnEquipo = await equipoFrio.create({
                nombre: "Tambo",
                litros: 0,
                capacidad: 135000
            });
            litrosEnEquipo.litros += litros
            await litrosEnEquipo.save({ transaction })
        }
        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear la producción de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postProduccionLecheHandler;
