const putClienteProveedor = async ({ id, importe, model, operacion }, transaction) => {
    if (!["+", "-"].includes(operacion)) {
        throw new Error("Operación no válida. Usa '+' o '-'.");
    }

    if (importe <= 0) {
        throw new Error("El importe debe ser mayor a 0.");
    }

    let entidad, resumenWhere;

    switch (model) {
        case "CLIENTE":
            entidad = Cliente;
            resumenWhere = { id_cliente: id };
            break;
        case "PROVEEDOR":
            entidad = Proveedor;
            resumenWhere = { id_proveedor: id };
            break;
        case "TAMBO_PROVEEDOR":
            entidad = TamboProveedor;
            resumenWhere = { id_tambo_proveedor: id };
            break;
        case "EMPLEADO":
            entidad = Empleado;
            resumenWhere = { id_empleado: id };
            break;
        default:
            throw new Error("Modelo no válido.");
    }

    const registro = await entidad.findOne({ where: { id }, transaction, lock: true });

    if (!registro) throw new Error(`${model} no encontrado.`);

    const saldoAnterior = registro.saldo;
    const nuevoSaldo = operacion === "+"
        ? saldoAnterior + importe
        : saldoAnterior - importe;

    await ResumenCuenta.create(
        {
            ...resumenWhere,
            debe: operacion === "-" ? importe : 0,
            haber: operacion === "+" ? importe : 0,
            saldo: nuevoSaldo,
            fecha: new Date()
        },
        { transaction }
    );

    await entidad.update(
        { saldo: nuevoSaldo },
        { where: { id }, transaction }
    );
};
