/**
 * Función para aplicar paginado a los datos en orden descendente por fecha de carga.
 * @param {Array} data - El array de datos a paginar.
 * @param {number} page - Número de la página actual.
 * @param {number} limit - Cantidad de elementos por página.
 * @returns {Object} - Datos paginados con información adicional.
 */
const paginate = (data, page = 1, limit = 10) => {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
        throw new Error("Los parámetros 'page' y 'limit' deben ser números mayores a 0.");
    }

    // Ordenar los datos del más nuevo al más viejo usando fecha_carga
    const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / limitNumber);
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    return {
        totalItems,
        totalPages,
        currentPage: pageNumber,
        data: paginatedData,
    };
};

module.exports = paginate;
