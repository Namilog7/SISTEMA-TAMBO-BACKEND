const { Cliente, Proveedor, Nota } = require("../../db");
const postResumen = require("../resumen/postResumen");

const postNota = async ({ descripcion, tipo, tipo_destinatario, importe, fecha_emision, id_afectado }, transaction) => {
    // Buscar el destinatario en la respectiva tabla
    console.log(descripcion)
    let afectado;
    if (tipo_destinatario === "CLIENTE") {
        afectado = await Cliente.findByPk(id_afectado, { transaction });
    } else if (tipo_destinatario === "PROVEEDOR") {
        afectado = await Proveedor.findByPk(id_afectado, { transaction });
    }
    if (!afectado) {
        throw new Error(`${tipo_destinatario} no encontrado con id ${id_afectado}.`);
    }
    // id_afectado, nota_tipo, fecha, detalle, pago, factura, model, importe 
    await postResumen({ id_afectado, nota_tipo: tipo, fecha: fecha_emision, detalle: descripcion, importe, model: tipo_destinatario }, transaction)

    // Actualizar el saldo según el tipo de nota
    if (tipo === "CREDITO") {
        afectado.saldo = afectado.saldo - importe;
    } else if (tipo === "DEBITO") {
        afectado.saldo = afectado.saldo + importe;
    }

    // Guardar los cambios en el saldo
    await afectado.save({ transaction });

    // Crear la nota
    const nuevaNota = await Nota.create({
        descripcion,
        tipo,
        tipo_destinatario,
        importe,
        fecha_emision,
        id_afectado,
    }, { transaction });

    // Retornar la respuesta estructurada
    return {
        message: "Nota creada exitosamente.",
        nota: nuevaNota,
        saldoActualizado: afectado.saldo,
    };
};

module.exports = postNota
