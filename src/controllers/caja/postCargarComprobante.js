//const { Remito, Factura } = require("../../db");

const putClienteProveedor = require("../cliente/putClienteProveedor")
const actualizarStock = require("../fabrica/actualizarStock")

const postCargarComprobante = async ({ datosFacturacion, arrayProductos, montoMetodos, cliente_proveedor, remito_factura }, transaction) => {
    // datosCliente,remitoNumero,detalle,fecha,Arrayproductos:nombre,cantidad,precio,id
    const { total, id_cliente } = datosFacturacion
    if (total > montoMetodos) {
        let diferencial = total - montoMetodos
        await putClienteProveedor({ id: id_cliente, importe: diferencial, model: cliente_proveedor, operacion: "+" }, transaction)
    }
    await actualizarStock(arrayProductos, transaction)
    const nuevoRemitoFactura = await remito_factura.create({
        ...datosFacturacion
    }, { transaction })
    return nuevoRemitoFactura
}
module.exports = postCargarComprobante