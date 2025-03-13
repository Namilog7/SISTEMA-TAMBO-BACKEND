const { Ingreso_recria, Recria, Ganado, Macho, Movimiento_anotacion, conn } = require("../../db");
const postGastoIngreso = require("../../controllers/caja/postGastoIngreso");
const registrarMetodosPago = require("../../helpers/registrarMetodosPago");

const postIngresoHandler = async (req, res) => {
    const { importe, arrayIngresos, aclaracion, usuario_carga, fecha_carga, hora_carga, tipo_ingreso, id_sector, fecha, tipo = "EGRESO", estado = "ACEPTADO", metodosPago, detalle = "" } = req.body;
    const transaction = await conn.transaction()
    try {

        if (
            !tipo_ingreso ||
            !arrayIngresos ||
            arrayIngresos.length === 0 ||
            !usuario_carga ||
            !fecha_carga ||
            !hora_carga
        ) {
            return res
                .status(400)
                .json({ message: "Todos los campos son obligatorios y debe haber al menos un ingreso." });
        }

        if (!["COMPRA", "ENTREGA", "PARTO"].includes(tipo_ingreso)) {
            return res.status(400).json({ message: "El tipo de operación debe ser COMPRA, ENTREGA o PARTO." });
        }
        let allMetodos
        if (tipo_ingreso === "COMPRA") {
            const { nuevoGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector }, transaction);
            allMetodos = await registrarMetodosPago(nuevoGastoIngreso.id, metodosPago, transaction)
        }
        // Crear el registro en Ingreso_recria
        const ingreso = await Ingreso_recria.create({
            fecha_carga,
            hora_carga,
            aclaraciones: aclaracion,
            usuario_carga,
            importe,
            tipo_ingreso,
        }, { transaction });
        // Crear registros en Recria y asociarlos con el Ingreso_recria

        const recriaRecords = arrayIngresos.map((ingreso) => ({
            origen: ingreso.origen,
            caravana: ingreso.caravana,
            genero: ingreso.genero,
            peso: ingreso.peso || null,
            fecha_ingreso: ingreso.fecha_ingreso || null,
            origen: ingreso.origen || null,
            id_ingreso: ingreso.id
        }));

        await Recria.bulkCreate(recriaRecords, { transaction });

        // Procesar hembras en la tabla Ganado
        const ganadoRecords = arrayIngresos
            .filter((ingreso) => ingreso.genero === "HEMBRA")
            .map((ingreso) => ({
                caravana: ingreso.caravana,
                fecha_ingreso: ingreso.fecha_ingreso || null,
                inseminado: false,
                detalles: null,
                tipo: "TERNERA",
                estado: "RECRIA",
            }));

        if (ganadoRecords.length > 0) {
            await Ganado.bulkCreate(ganadoRecords, { transaction });
        }

        // Contar machos y actualizar el contador en la tabla Macho
        const cantidadMachos = arrayIngresos.filter((ingreso) => ingreso.genero === "MACHO");
        let string = "";
        cantidadMachos.forEach((macho) => {
            string += `${macho.origen} `;
        });
        if (cantidadMachos.length > 0) {
            const machoRegistro = await Macho.findOne({ transaction });
            if (!machoRegistro) {
                await Macho.create({
                    ultimo_ingreso: new Date(),
                    ternero_contador: cantidadMachos.length,
                });
            } else {
                /*  machoRegistro.ultimo_ingreso = new Date()
                 machoRegistro.ternero_contador = ternero_contador + cantidadMachos.length; */
                machoRegistro.ultimo_ingreso = new Date();
                machoRegistro.ternero_contador = machoRegistro.ternero_contador + cantidadMachos.length;
                await machoRegistro.save({ transaction });
            }
            let stringText;
            switch (tipo_ingreso) {
                case "PARTO":
                    stringText = `Nacieron ${cantidadMachos.length} terneros de las vacas ${string}`;
                    break;
                case "COMPRA":
                    stringText = `Se compraron ${cantidadMachos.length} terneros`;
                    break;
                case "ENTREGA":
                    stringText = `Se entregaron ${cantidadMachos.length} terneros`;
                    break;
                default:
                    stringText = "Tipo de ingreso no reconocido";
                    break;
            }
            await Movimiento_anotacion.create({
                fecha: new Date(),
                texto: stringText,
                terneros_afectados: cantidadMachos.length,
                tipo_movimiento: "INGRESO",
            }, { transaction });
        }
        await transaction.commit()

        res.status(201).json({
            message: "Ingreso y recría creados con éxito. Ganado y contador de machos actualizados.",
            ingreso,
            recria: recriaRecords,
            ganado: ganadoRecords.length > 0 ? ganadoRecords : "No se crearon registros en Ganado",
            machos:
                cantidadMachos.length > 0
                    ? `Se sumaron ${cantidadMachos.length} machos al contador.`
                    : "No se registraron machos.",
            allMetodos
        });
    } catch (error) {
        console.error("Error en postIngresoHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postIngresoHandler;
