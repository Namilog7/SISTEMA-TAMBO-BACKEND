const { Sector, Producto } = require("../../db");

const postProducto = async ({ id_sector, nombre, stock, ultimo_ingreso, precio_reventa, precio_comercio, precio_consumidor_final, litro_variedad, ultima_venta, masa_sin_elaborar }) => {
    const sectorFabrica = await Sector.findByPk(id_sector);
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
        })
        return producto
    }
    return {
        message: "Puede que el sector no exista"
    }
}

module.exports = postProducto