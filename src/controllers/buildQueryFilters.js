const { Op } = require("sequelize");

const buildQueryFilters = (Model, query) => {
    const filters = {};
    const modelAttributes = Model.rawAttributes;

    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(modelAttributes, key)) {
            let value = query[key];

            // Lógica para campos booleanos
            const attributeType = modelAttributes[key].type.constructor.key;
            if (attributeType === "BOOLEAN") {
                if (value === "true" || value === "1" || value === true) {
                    filters[key] = true;
                } else if (value === "false" || value === "0" || value === false) {
                    filters[key] = false;
                } else {
                    throw new Error(`El valor para el campo booleano "${key}" no es válido.`);
                }
                continue;
            }

            if (key) {
                const capitalizedValue = value
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                filters[key] = {
                    [Op.iLike]: `%${value}%`, // Para Postgres
                };
                continue;
            }

            // Filtros genéricos para otros atributos
            if (Array.isArray(value)) {
                filters[key] = { [Op.in]: value }; // Si es un array, busca coincidencias múltiples
            } else {
                filters[key] = value; // Comparación exacta para otros tipos
            }
        }
    }
    return filters;
};

module.exports = buildQueryFilters;
