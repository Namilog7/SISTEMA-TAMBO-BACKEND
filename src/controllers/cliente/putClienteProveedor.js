const { Cliente, Proveedor } = require("../../db");

const putClienteProveedor = async ({ id, importe, model, operacion }, transaction) => {
    if (!["+", "-"].includes(operacion)) {
        throw new Error("Operación no válida. Usa '+' o '-'.");
    }

    let entidad;
    if (model === "CLIENTE") {
        entidad = Cliente;
    } else if (model === "PROVEEDOR") {
        entidad = Proveedor;
    } else {
        throw new Error("Modelo no válido. Usa 'CLIENTE' o 'PROVEEDOR'.");
    }

    const registro = await entidad.findOne({ where: { id }, }, { transaction });

    if (!registro) {
        throw new Error(`${model} no encontrado.`);
    }

    const nuevoSaldo = operacion === "+"
        ? registro.saldo + importe
        : registro.saldo - importe;

    await entidad.update(
        { saldo: nuevoSaldo },
        { where: { id } }, { transaction }
    );
};

module.exports = putClienteProveedor;
