//const { Remito, Factura } = require("../../db");

const postFacturacion = async ({ datosFacturacion }, model, transaction) => {
    // datosCliente,remitoNumero,detalle,fecha,Arrayproductos:nombre,cantidad,precio,id
    const nuevoRemitoFactura = await model.create({
        ...datosFacturacion
    }, { transaction })
    return nuevoRemitoFactura
}
module.exports = postFacturacion