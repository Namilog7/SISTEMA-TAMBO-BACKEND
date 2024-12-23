
const { ControlLechero, InformeLechero, conn } = require("../../db"); // Para manejar transacciones con Sequelize

const postControlLecheroHandler = async (req, res) => {
    const { controlLecheroArray, litros_tanque, hora_inicio_ordeñe1_lote1, hora_fin_ordeñe1_lote1, hora_inicio_ordeñe1_lote2, hora_fin_ordeñe1_lote2, hora_inicio_ordeñe2_lote1, hora_fin_ordeñe2_lote1, hora_inicio_ordeñe2_lote2, hora_fin_ordeñe2_lote2, hora_carga } = req.body;

    // Validar que el array de controles sea válido
    if (!controlLecheroArray || !Array.isArray(controlLecheroArray) || controlLecheroArray.length === 0) {
        return res.status(400).json({ message: "El array 'controlLecheroArray' es obligatorio y no puede estar vacío." });
    }

    // Validar que cada objeto en el array tenga las propiedades necesarias
    for (const control of controlLecheroArray) {
        const { litros_ordeñe1, litros_ordeñe2, total, id_ganado, lote } = control;
        if (
            litros_ordeñe1 === undefined ||
            litros_ordeñe2 === undefined ||
            total === undefined ||
            !id_ganado ||
            (lote !== "UNO" && lote !== "DOS")
        ) {
            return res.status(400).json({
                message: "Cada objeto en 'controlLecheroArray' debe incluir litros_ordeñe1, litros_ordeñe2, total, id_ganado y lote (1 o 2).",
            });
        }
    }

    const transaction = await conn.transaction(); // Iniciar transacción

    try {
        // Crear el InformeLechero
        const informe = await InformeLechero.create(
            { litros_tanque, hora_inicio_ordeñe1_lote1, hora_fin_ordeñe1_lote1, hora_inicio_ordeñe1_lote2, hora_fin_ordeñe1_lote2, hora_inicio_ordeñe2_lote1, hora_fin_ordeñe2_lote1, hora_inicio_ordeñe2_lote2, hora_fin_ordeñe2_lote2, hora_carga },
            { transaction }
        );

        // Agregar el id_informe a cada objeto en el array
        const controlLecheroData = controlLecheroArray.map((control) => ({
            ...control,
            id_informe: informe.id, // Asociar el informe
        }));

        // Crear múltiples registros de ControlLechero
        const response = await ControlLechero.bulkCreate(controlLecheroData, { transaction });

        // Calcular métricas para actualizar el InformeLechero
        const litros_medidos = controlLecheroArray.reduce(
            (sum, control) => sum + control.litros_ordeñe1 + control.litros_ordeñe2,
            0
        );

        const total_vacas_ordeñe = controlLecheroArray.length; // Total de animales ordeñados
        const promedio_tambo = litros_medidos / total_vacas_ordeñe;

        const litros_lote1 = controlLecheroArray
            .filter((control) => control.lote === "UNO")
            .reduce((sum, control) => sum + control.total, 0);

        const litros_lote2 = controlLecheroArray
            .filter((control) => control.lote === "DOS")
            .reduce((sum, control) => sum + control.total, 0);

        // Actualizar el InformeLechero con las métricas calculadas
        await informe.update(
            {
                litros_medidos,
                total_vacas_ordeñe,
                promedio_tambo,
                litros_lote1,
                litros_lote2,
            },
            { transaction }
        );

        // Confirmar transacción
        await transaction.commit();

        return res.status(201).json({
            message: "Se creó el informe y los controles lecheros asociados.",
            informe,
            response,
        });
    } catch (error) {
        // Revertir transacción en caso de error
        await transaction.rollback();
        console.error("Error al crear el control lechero:", error);
        res.status(500).json({ error: `Algo falló: ${error.message}` });
    }
};

module.exports = postControlLecheroHandler;
