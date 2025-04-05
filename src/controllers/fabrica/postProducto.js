const { Sector, Producto } = require("../../db");
const restarLitrosTanque = require("../../helpers/restarLitrosTanque");

const postProducto = async ({ id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta, masa_sin_elaborar }, transaction) => {
    const sectorFabrica = await Sector.findByPk(id_sector, { transaction });
    if (sectorFabrica) {
        const producto = await Producto.create({
            nombre,
            stock,
            id_sector,
            ultimo_ingreso,
            precio_comercio,
            precio_consumidor_final,
            precio_reventa,
            litro_variedad,
            ultima_venta,
            masa_sin_elaborar
        }, { transaction })
        if (stock > 0) {
            await restarLitrosTanque({ litro_variedad, cantidad: stock }, transaction)
        }
        return producto
    }
    return {
        message: "Puede que el sector no exista"
    }
}

module.exports = postProducto