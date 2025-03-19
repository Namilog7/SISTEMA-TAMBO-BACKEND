
const crearBulkTablaIntermedia = (arrayObjs, id, idKey) => {
    return arrayObjs.map(({ ...arrayObjs }) => ({
        ...arrayObjs,
        [idKey]: id
    }));
}

module.exports = crearBulkTablaIntermedia