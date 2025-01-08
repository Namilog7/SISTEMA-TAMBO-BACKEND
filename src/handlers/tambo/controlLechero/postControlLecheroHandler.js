const { InformeLechero, Lote, ControlLechero, conn } = require("../../../db");

const postControlLecheroHandler = async (req, res) => {
    const { litros_tanque, hora_carga, fecha, lotesArray } = req.body;

    // Validar datos básicos
    if (!lotesArray || !Array.isArray(lotesArray) || lotesArray.length === 0) {
        return res.status(400).json({ message: "El array 'lotesArray' es obligatorio y no puede estar vacío." });
    }

    for (const lote of lotesArray) {
        const { nombre_lote, hora_inicio_ordeñe1, hora_fin_ordeñe1, hora_inicio_ordeñe2, hora_fin_ordeñe2, controlesArray } =
            lote;

        // Validar datos del lote
        if (
            !nombre_lote ||
            !hora_inicio_ordeñe1 ||
            !hora_fin_ordeñe1 ||
            !hora_inicio_ordeñe2 ||
            !hora_fin_ordeñe2 ||
            !controlesArray ||
            !Array.isArray(controlesArray) ||
            controlesArray.length === 0
        ) {
            return res.status(400).json({
                message: `Cada lote debe incluir nombre_lote, horas de ordeñe y al menos un control.`,
            });
        }

        // Validar datos de controles
        for (const control of controlesArray) {
            const { litros_ordeñe1, litros_ordeñe2, total, observacion, caravana } = control;
            if (
                litros_ordeñe1 === undefined ||
                litros_ordeñe2 === undefined ||
                total === undefined ||
                !caravana
            ) {
                return res.status(400).json({
                    message: `Cada control debe incluir litros_ordeñe1, litros_ordeñe2, total, observacion y caravana.`,
                });
            }
        }
    }

    // Iniciar transacción
    const transaction = await conn.transaction();

    try {
        // Crear el InformeLechero
        const informe = await InformeLechero.create(
            { litros_tanque, hora_carga, fecha },
            { transaction }
        );

        // Procesar cada lote y sus controles
        for (const lote of lotesArray) {
            const { nombre_lote, hora_inicio_ordeñe1, hora_fin_ordeñe1, hora_inicio_ordeñe2, hora_fin_ordeñe2, controlesArray } =
                lote;

            // Crear el Lote asociado al InformeLechero
            const nuevoLote = await Lote.create(
                {
                    nombre_lote,
                    hora_inicio_ordeñe1,
                    hora_fin_ordeñe1,
                    hora_inicio_ordeñe2,
                    hora_fin_ordeñe2,
                    id_informe: informe.id, // Relación con InformeLechero
                },
                { transaction }
            );

            // Crear controles asociados al Lote y al InformeLechero
            const controlesData = controlesArray.map((control) => ({
                ...control,
                id_lote: nuevoLote.id,
                id_informe: informe.id,
            }));

            await ControlLechero.bulkCreate(controlesData, { transaction });
        }

        // Calcular métricas para actualizar el InformeLechero
        const litros_medidos = lotesArray.reduce(
            (sumLote, lote) =>
                sumLote +
                lote.controlesArray.reduce(
                    (sumControl, control) => sumControl + control.litros_ordeñe1 + control.litros_ordeñe2,
                    0
                ),
            0
        );

        const total_vacas_ordeñe = lotesArray.reduce(
            (sumLote, lote) => sumLote + lote.controlesArray.length,
            0
        );

        const promedio_tambo = litros_medidos / total_vacas_ordeñe;

        // Actualizar el InformeLechero con métricas calculadas
        await informe.update(
            {
                litros_medidos,
                total_vacas_ordeñe,
                promedio_tambo,
            },
            { transaction }
        );

        // Confirmar transacción
        await transaction.commit();

        return res.status(201).json({
            message: "Informe, lotes y controles creados exitosamente.",
            informe,
        });
    } catch (error) {
        // Revertir transacción en caso de error
        await transaction.rollback();
        console.error("Error al crear el informe lechero:", error);
        return res.status(500).json({ message: `Algo falló: ${error.message}` });
    }
};

module.exports = postControlLecheroHandler;
