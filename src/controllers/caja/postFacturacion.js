//const { Remito, Factura } = require("../../db");

const putClienteProveedor = require("../cliente/putClienteProveedor")

const postFacturacion = async ({ datosFacturacion }, montoMetodos, model, transaction) => {
    // datosCliente,remitoNumero,detalle,fecha,Arrayproductos:nombre,cantidad,precio,id
    const { total, id_cliente } = datosFacturacion
    if (total > montoMetodos) {
        let diferencial = total - montoMetodos
        await putClienteProveedor({ id: id_cliente, importe: diferencial, model: "CLIENTE", operacion: "+" }, transaction)
    }
    const nuevoRemitoFactura = await model.create({
        ...datosFacturacion
    }, { transaction })
    return nuevoRemitoFactura
}
module.exports = postFacturacion