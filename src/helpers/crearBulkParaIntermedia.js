const crearBulkTablaIntermedia = (arrayObjs, id, idKey) => {
    return arrayObjs.map(({ ...arrayObjs }) => ({
        ...arrayObjs,
        [idKey]: id,
    }));
};

// const crearBulkTablaIntermedia = (arrayObjs, id, idKey) => {
//     return arrayObjs.map(({ id: productoId, ...rest }) => ({
//         ...rest,
//         [idKey]: id, // esto será id_venta
//         ProductoId: productoId, // relación con Producto
//     }));
// };

module.exports = crearBulkTablaIntermedia;
