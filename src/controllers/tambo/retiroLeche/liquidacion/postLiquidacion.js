const { Liquidacion, RetiroLeche } = require("../../../../db");
const postCloudinary = require("../../../postCloudinary");
const postGastoIngreso = require("../../../caja/postGastoIngreso");
const registrarMetodosPago = require("../../../../helpers/registrarMetodosPago")

const postLiquidacion = async ({
    arrayIdRetiros,
    precio_litro,
    fecha,
    litros,
    importe_total,
    importe_blanco,
    importe_negro,
    imagenBase64,
    detalle,
    id_sector,
    tipo,
    estado,
    metodosPago,
    transaction
}) => {

    if (!arrayIdRetiros || arrayIdRetiros.length === 0) {
        throw new Error("El array de retiros no puede estar vacío.");
    }

    // Verificar que todos los IDs de `arrayIdRetiros` existan
    const retiros = await RetiroLeche.findAll({
        where: { id: arrayIdRetiros },
    }, { transaction });

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
    let url_image
    if (imagenBase64) {
        url_image = await postCloudinary(imagenBase64, "liquidacionLeche")
    }
    // Crear la liquidación con los valores calculados
    const nuevaLiquidacion = await Liquidacion.create({
        cantidad: cantidadTotal,
        precio_litro,
        fecha,
        litros,
        importe_total,
        importe_blanco,
        importe_negro,
        url_image
    }, { transaction });

    await RetiroLeche.update(
        {
            id_liquidacion: nuevaLiquidacion.id,
            liquidado: true,
        },
        {
            where: { id: arrayIdRetiros },
            transaction
        }
    );

    const { newGastoIngreso } = await postGastoIngreso({ detalle, estado, tipo, fecha, id_sector }, transaction);
    const metodos = await registrarMetodosPago(newGastoIngreso.id, metodosPago, transaction)

    return {
        message: "Liquidación creada y retiros actualizados correctamente.",
        liquidacion: nuevaLiquidacion,
        newGastoIngreso,
        metodos
    };
};

module.exports = postLiquidacion;
