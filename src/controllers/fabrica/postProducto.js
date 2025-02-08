const { Sector, Producto } = require("../../db");

const postProducto = async ({ id_sector, nombre, stock }) => {
    const sectorFabrica = await Sector.findByPk(id_sector);
    if (sectorFabrica) {
        const producto = await Producto.create({
            nombre,
            stock,
            fecha_ultimo_movimiento: new Date(),
            id_sector
        })
        return producto
    }
    return {
        message: "Puede que el sector no exista"
    }
}

module.exports = postProducto