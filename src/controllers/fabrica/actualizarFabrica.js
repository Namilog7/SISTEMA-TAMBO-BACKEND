const { Producto, EquipoFrio } = require("../../db");

const actualizarFabrica = async ({ id, cantidad, variedad, masa_sin_elaborar }, transaction) => {
    const updateProducto = await Producto.findOne({
        where: { id },
        transaction,
    });

    if (!updateProducto) throw new Error("No se encuentra el producto");

    updateProducto.stock += cantidad;
    updateProducto.masa_sin_elaborar = masa_sin_elaborar;
    await updateProducto.save({ transaction });

    const equipoFabrica = await EquipoFrio.findOne({
        where: { nombre: "Fabrica" },
        transaction,
    });

    if (!equipoFabrica) throw new Error("No se encontró el equipo");

    const litrosRestar = variedad * cantidad;
    equipoFabrica.litros -= litrosRestar;
    await equipoFabrica.save({ transaction });
};

module.exports = actualizarFabrica;
