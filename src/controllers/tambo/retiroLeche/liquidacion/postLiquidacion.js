const { Liquidacion, RetiroLeche } = require("../../../../db");

const postLiquidacion = async ({ arrayIdRetiros, precio_litro, fecha, litros, importe_total, importe_blanco, importe_negro }) => {
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

    // Validar que ningún retiro ya esté liquidado
    const retirosYaLiquidados = retiros.filter(retiro => retiro.liquidado);
    if (retirosYaLiquidados.length > 0) {
        throw new Error(
            `Los siguientes retiros ya fueron liquidados: ${retirosYaLiquidados
                .map(retiro => retiro.id)
                .join(", ")}.`
        );
    }

    // Calcular la cantidad total como la suma de los campos `cantidad` de los retiros
    const cantidadTotal = retiros.reduce((total, retiro) => total + retiro.cantidad, 0);

    // Crear la liquidación con los valores calculados
    const nuevaLiquidacion = await Liquidacion.create({
        cantidad: cantidadTotal,
        precio_litro,
        fecha,
        litros,
        importe_total,
        importe_blanco,
        importe_negro
    });

    // Adjuntar el ID de la liquidación creada y actualizar `liquidado` a `true`
    const idLiquidacion = nuevaLiquidacion.id;

    await RetiroLeche.update(
        {
            id_liquidacion: idLiquidacion,
            liquidado: true, // Cambiar el estado a `true`
        },
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
