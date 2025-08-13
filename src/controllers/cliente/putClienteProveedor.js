const { Cliente, Proveedor, Empleado, TamboProveedor, ResumenCuenta } = require("../../db");

const putClienteProveedor = async ({ id, importe, model, operacion }, transaction) => {
    if (!["+", "-"].includes(operacion)) {
        throw new Error("Operación no válida. Usa '+' o '-'.");
    }

    let entidad;
    let resumenWhere = {};

    if (model === "CLIENTE") {
        entidad = Cliente;
        resumenWhere = { id_cliente: id };
    } else if (model === "PROVEEDOR") {
        entidad = Proveedor;
        resumenWhere = { id_proveedor: id };
    } else if (model === "TAMBO_PROVEEDOR") {
        entidad = TamboProveedor;
        resumenWhere = { id_tambo_proveedor: id };
    } else if (model === "EMPLEADO") {
        entidad = Empleado;
        resumenWhere = { id_empleado: id };
    } else {
        throw new Error("Modelo no válido. Usa 'CLIENTE', 'EMPLEADO', 'TAMBO_PROVEEDOR' o 'PROVEEDOR'.");
    }

    const registro = await entidad.findOne({ where: { id }, transaction });

    if (!registro) {
        throw new Error(`${model} no encontrado.`);
    }

    const saldoAnterior = registro.saldo;

    await ResumenCuenta.update(
        { saldo: saldoAnterior },
        { where: resumenWhere, transaction }
    );

    const nuevoSaldo = operacion === "+"
        ? saldoAnterior + importe
        : saldoAnterior - importe;

    await entidad.update({ saldo: nuevoSaldo }, { where: { id }, transaction });
};

module.exports = putClienteProveedor;
