const { RetiroLeche, User, CompraLeche, EquipoFrio } = require("../../../db");
const crudController = require("../../../controllers/crudController");
const postSistemaMovimiento = require("../../../controllers/sistema_movimiento/postSistemaMovimiento");
const putEquipoFrio = require("../../../controllers/equipoFrio/putEquipoFrio");

const postRetiroLecheHandler = async (req, res) => {
    const { id_proveedor } = req.query
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
        const userId = id_empleado.replace(/"/g, "");
        const empleado = await User.findByPk(userId);
        let response;
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        // Construir el nombre completo del empleado
        const usuario_carga = empleado.nombre;
        if (id_proveedor) {
            response = await CompraLeche.create({
                cantidad,
                fecha,
                liquidado,
                hora_carga,
                hora_retiro,
                encargado_retiro,
                aclaracion,
                id_empleado,
                estado,
                id_liquidacion,
                id_proveedor
            });
            await putEquipoFrio({ nombre: "Fabrica", litros: cantidad })
        } else {
            // Crear el registro en RetiroLeche con el nombre completo del empleado
            response = await postRetiroLeche.create({
                cantidad,
                fecha,
                liquidado,
                hora_carga,
                hora_retiro,
                usuario_carga,
                encargado_retiro,
                aclaracion,
                estado,
                id_cliente,
                id_liquidacion,
            });
            let equipoFrio = await EquipoFrio.findOne({});
            if (!equipoFrio) {
                throw new Error("No hay un equipo de frio")
            }
            equipoFrio.litros -= cantidad;
            equipoFrio.save()
        }
        await postSistemaMovimiento({ user_tipo: empleado.tipo, fecha, nombre_sector: "TAMBO", actividad: "CARGA RETIRO DE LECHE", hora: hora_carga })
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear el retiro de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postRetiroLecheHandler;
