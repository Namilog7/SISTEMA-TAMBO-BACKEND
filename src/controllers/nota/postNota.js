const { Cliente, Proveedor, Nota } = require("../../db");

const postNota = async ({ descripcion, tipo, tipo_destinatario, importe, fecha_emision, id_afectado }) => {
    // Buscar el destinatario en la respectiva tabla
    let afectado;
    if (tipo_destinatario === "CLIENTE") {
        afectado = await Cliente.findByPk(id_afectado);
    } else if (tipo_destinatario === "PROVEEDOR") {
        afectado = await Proveedor.findByPk(id_afectado);
    }
    console.log(id_afectado)
    if (!afectado) {
        throw new Error(`${tipo_destinatario} no encontrado con id ${id_afectado}.`);
    }

    // Actualizar el saldo según el tipo de nota
    if (tipo === "CREDITO") {
        afectado.saldo = afectado.saldo - importe;
    } else if (tipo === "DEBITO") {
        afectado.saldo = afectado.saldo + importe;
    }

    // Guardar los cambios en el saldo
    await afectado.save();

    // Crear la nota
    const nuevaNota = await Nota.create({
        descripcion,
        tipo,
        tipo_destinatario,
        importe,
        fecha_emision,
        id_afectado,
    });

    // Retornar la respuesta estructurada
    return {
        message: "Nota creada exitosamente.",
        nota: nuevaNota,
        saldoActualizado: afectado.saldo,
    };
};

module.exports = postNota
