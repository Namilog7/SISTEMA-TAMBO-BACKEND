
const { ControlLechero, InformeLechero, conn } = require("../../db"); // Para manejar transacciones con Sequelize

const postControlLecheroHandler = async (req, res) => {
    const { controlLecheroArray, hora_inicio, hora_fin, litros_tanque } = req.body;

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
            (lote !== 1 && lote !== 2)
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
            { hora_inicio, hora_fin, litros_tanque },
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
            .filter((control) => control.lote === 1)
            .reduce((sum, control) => sum + control.total, 0);

        const litros_lote2 = controlLecheroArray
            .filter((control) => control.lote === 2)
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
