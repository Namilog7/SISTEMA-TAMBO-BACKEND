const { Ingreso_recria, Recria, Ganado, Macho } = require("../../db");

const postCompraHandler = async (req, res) => {
    try {
        const { tipo, importe, arrayIngresos, aclaracion, usuario_carga, fecha_carga, hora_carga, tipo_ingreso } = req.body;

        if (!tipo || !importe || !arrayIngresos || arrayIngresos.length === 0 || !usuario_carga || !fecha_carga || !hora_carga) {
            return res.status(400).json({ message: "Todos los campos son obligatorios y debe haber al menos un ingreso." });
        }

        if (!["COMPRA", "ENTREGA", "PARTO"].includes(tipo)) {
            return res.status(400).json({ message: "El tipo de operación debe ser COMPRA, ENTREGA o PARTO." });
        }

        // Crear el registro en Ingreso_recria
        const ingreso = await Ingreso_recria.create({
            tipo_ingreso: tipo,
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
                tipo: null,
                estado: "RECRIA",
            }));

        if (ganadoRecords.length > 0) {
            await Ganado.bulkCreate(ganadoRecords);
        }

        // Contar machos y actualizar el contador en la tabla Macho
        const cantidadMachos = arrayIngresos.filter((ingreso) => ingreso.genero === "MACHO").length;

        if (cantidadMachos > 0) {
            const machoRegistro = await Macho.findOne();

            if (machoRegistro) {
                await machoRegistro.update({ terneroContador: machoRegistro.terneroContador + cantidadMachos });
            } else {
                await Macho.create({ terneroContador: cantidadMachos });
            }
        }

        res.status(201).json({
            message: "Ingreso y recría creados con éxito. Ganado y contador de machos actualizados.",
            ingreso,
            recria: recriaRecords,
            ganado: ganadoRecords.length > 0 ? ganadoRecords : "No se crearon registros en Ganado",
            machos: cantidadMachos > 0 ? `Se sumaron ${cantidadMachos} machos al contador.` : "No se registraron machos.",
        });
    } catch (error) {
        console.error("Error en postCompraHandler:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = postCompraHandler;
