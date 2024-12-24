const { Liquidacion, RetiroLeche } = require("../../db");

const postLiquidacion = async ({ arrayIdRetiros, cantidad, precio_litro, importe }) => {
    if (!arrayIdRetiros || arrayIdRetiros.length === 0) {
        throw new Error("El array de retiros no puede estar vacío.");
    }

    // Verificar que todos los IDs de `arrayIdRetiros` existan
    const retiros = await RetiroLeche.findAll({
        where: { id: arrayIdRetiros },
    });

    if (retiros.length !== arrayIdRetiros.length) {
        throw new Error("Uno o más IDs de RetiroLeche no existen.");
    }

    // Crear la liquidación
    const nuevaLiquidacion = await Liquidacion.create({
        cantidad,
        precio_litro,
        importe,
    });

    // Adjuntar el ID de la liquidación creada a los retiros
    const idLiquidacion = nuevaLiquidacion.id;

    await RetiroLeche.update(
        { id_liquidacion: idLiquidacion }, // Asegúrate de que este campo exista en el modelo `RetiroLeche`
        {
            where: { id: arrayIdRetiros },
        }
    );

    return {
        message: "Liquidación creada y retiros actualizados correctamente.",
        liquidacion: nuevaLiquidacion,
    };
};

module.exports = postLiquidacion;
