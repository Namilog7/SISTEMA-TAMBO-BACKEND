const postCloudinary = require("../../controllers/postCloudinary");
const { Movimiento_rollo, Rollo } = require("../../db");
const { Sequelize } = require("sequelize");

const postMovimientoRollo = async ({ tipo_movimiento, rollos_afectados, archivo }, transaction) => {
    let comprobante;
    if (archivo) {
        comprobante = await postCloudinary(archivo, "rollos");
    }

    let tipoCantidad = [];
    let textoDetalle;

    rollos_afectados.forEach(({ tipo, cantidad }) => {
        tipoCantidad.push(`${cantidad} de ${tipo}`);
    });

    switch (tipo_movimiento) {
        case "VENTA":
            textoDetalle = `Se vendieron ${tipoCantidad.join(", ")}`;
            break;
        case "CONSUMO":
            textoDetalle = `Se consumieron ${tipoCantidad.join(", ")}`;
            break;
        case "INGRESO":
            textoDetalle = `Ingreso de ${tipoCantidad.join(", ")}`;
            break;
        case "ELIMINARON":
            textoDetalle = `Se eliminó ${tipoCantidad.join(", ")}`;
            break;
        default:
            throw new Error("Tipo de movimiento inválido");
    }

    const movimientoRollo = await Movimiento_rollo.create(
        {
            tipo_movimiento,
            fecha: new Date(),
            archivo: comprobante,
            texto: textoDetalle,
        },
        { transaction }
    );

    if (["VENTA", "CONSUMO", "ELIMINARON"].includes(tipo_movimiento)) {
        await Promise.all(
            rollos_afectados.map(async ({ tipo, cantidad }) => {

                const rollo = await Rollo.findOne({
                    where: { tipo },
                    transaction
                });

                if (!rollo) {
                    throw new Error(`No se encontró un rollo con el nombre: ${tipo}`);
                }

                if (rollo.cantidad < cantidad) {
                    throw new Error(`Stock insuficiente para el rollo: ${tipo}`);
                }

                await Rollo.update(
                    { cantidad: Sequelize.literal(`cantidad - ${cantidad}`) },
                    { where: { tipo }, transaction }
                );
            })
        );
    }

    return movimientoRollo;
};

module.exports = postMovimientoRollo;
