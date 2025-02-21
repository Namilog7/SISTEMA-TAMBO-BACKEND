const { Ingreso_recria, Recria, Ganado, Macho, Movimiento_anotacion } = require("../../db");

const postCompraHandler = async (req, res) => {
    try {
        const { importe, arrayIngresos, aclaracion, usuario_carga, fecha_carga, hora_carga, tipo_ingreso } = req.body;

        if (!tipo_ingreso || !arrayIngresos || arrayIngresos.length === 0 || !usuario_carga || !fecha_carga || !hora_carga) {
            return res.status(400).json({ message: "Todos los campos son obligatorios y debe haber al menos un ingreso." });
        }

        if (!["COMPRA", "ENTREGA", "PARTO"].includes(tipo_ingreso)) {
            return res.status(400).json({ message: "El tipo de operación debe ser COMPRA, ENTREGA o PARTO." });
        }

        // Crear el registro en Ingreso_recria
        const ingreso = await Ingreso_recria.create({
            fecha_carga,
            hora_carga,
            aclaraciones: aclaracion,
            usuario_carga,
            importe,
            tipo_ingreso
        });

        // Crear registros en Recria y asociarlos con el Ingreso_recria
        const recriaRecords = arrayIngresos.map((ingreso) => ({
            origen: ingreso.origen,
            caravana: ingreso.caravana,
            genero: ingreso.genero,
            peso: ingreso.peso || null,
            fecha_ingreso: ingreso.fecha_ingreso || null,
            caravana_madre: ingreso.caravana_madre || null,
            ingresoRecriaId: ingreso.id, // Relacionar con el ingreso
        }));

        await Recria.bulkCreate(recriaRecords);

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
            await Ganado.bulkCreate(ganadoRecords);
        }

        // Contar machos y actualizar el contador en la tabla Macho
        const cantidadMachos = arrayIngresos.filter((ingreso) => ingreso.genero === "MACHO");
        let string = ""
        cantidadMachos.forEach(macho => {
            string += `${macho.caravana_madre} `
        });
        if (cantidadMachos.length > 0) {
            const machoRegistro = await Macho.findOne();
            if (!machoRegistro) await Macho.create({
                ultimo_ingreso: new Date(),
                ternero_contador: cantidadMachos.length
            })
            else {
                /*  machoRegistro.ultimo_ingreso = new Date()
                 machoRegistro.ternero_contador = ternero_contador + cantidadMachos.length; */
                machoRegistro.ultimo_ingreso = new Date();
                machoRegistro.ternero_contador += cantidadMachos.length;
                await machoRegistro.save();
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
            console.log(stringText)
            await Movimiento_anotacion.create({
                fecha: new Date(),
                texto: stringText
            })
        }

        res.status(201).json({
            message: "Ingreso y recría creados con éxito. Ganado y contador de machos actualizados.",
            ingreso,
            recria: recriaRecords,
            ganado: ganadoRecords.length > 0 ? ganadoRecords : "No se crearon registros en Ganado",
            machos: cantidadMachos.length > 0 ? `Se sumaron ${cantidadMachos.length} machos al contador.` : "No se registraron machos.",
        });
    } catch (error) {
        console.error("Error en postCompraHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postCompraHandler;
