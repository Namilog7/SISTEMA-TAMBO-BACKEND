const { Producto } = require("../../db");
const { Sequelize } = require("sequelize");

const actualizarStock = async (arrayObjs, transaction) => {
    for (const { id_producto, cantidad } of arrayObjs) {
        const producto = await Producto.findOne({ where: { id: id_producto }, transaction });

        if (!producto) {
            throw new Error(`Producto con ID ${id_producto} no encontrado.`);
        }

        if (producto.stock < cantidad) {
            throw new Error(`No hay suficiente stock para el producto ${producto.id}.`);
        }

        await Producto.update(
            { stock: Sequelize.literal(`stock - ${cantidad}`) },
            { where: { id: id_producto }, transaction }
        );
    }
};
module.exports = actualizarStock;
