const { RetiroLeche, User, CompraLeche, conn } = require("../../../db");
const crudController = require("../../../controllers/crudController");
const postSistemaMovimiento = require("../../../controllers/sistema_movimiento/postSistemaMovimiento");
const putEquipoFrio = require("../../../controllers/equipoFrio/putEquipoFrio");
const sistemaMovimientoObj = require("../../../helpers/SistemaMovimientoObj");
const postCloudinary = require("../../../controllers/postCloudinary");

const postRetiroLecheHandler = async (req, res) => {
    const { id_proveedor } = req.query;
    const transaction = await conn.transaction();
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
        actaBase64,
    } = req.body;

    console.log(aclaracion);

    const postRetiroLeche = crudController(RetiroLeche);

    try {
        const userId = id_empleado.replace(/"/g, "");
        const empleado = await User.findByPk(userId, { transaction });
        let response;
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        // Construir el nombre completo del empleado
        const usuario_carga = empleado.nombre;
        if (id_proveedor) {
            let actaUrl;
            if (actaBase64) {
                actaUrl = await postCloudinary(actaBase64, "compra_leche");
            }

            response = await CompraLeche.create(
                {
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
                    id_tambo_proveedor: id_proveedor,
                    acta_url: actaUrl,
                },
                { transaction }
            );
            await putEquipoFrio({ nombre: "Fabrica", litros: cantidad, operacion: "+" }, transaction);
        } else {
            // Crear el registro en RetiroLeche con el nombre completo del empleado
            response = await postRetiroLeche.create(
                {
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
                },
                { transaction }
            );
            await putEquipoFrio({ nombre: "Tambo", litros: cantidad, operacion: "-" }, transaction);
        }
        await postSistemaMovimiento(
            {
                user_tipo: empleado.role,
                nombre_sector: "tambo",
                movimiento: sistemaMovimientoObj.retiroLeche,

                fecha: new Date(),
            },
            transaction
        );
        await transaction.commit();
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear el retiro de leche:", error);
        res.status(500).json({ message: `Error interno: ${error.message}` });
    }
};

module.exports = postRetiroLecheHandler;
