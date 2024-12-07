const { Op } = require("sequelize");

const buildQueryFilters = (Model, query) => {
    const filters = {};
    const modelAttributes = Model.rawAttributes;

    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(modelAttributes, key)) {
            let value = query[key];

            // Lógica para atributos ENUM
            const attributeType = modelAttributes[key].type.constructor.key;
            if (attributeType === "ENUM") {
                const validValues = modelAttributes[key].type.values;
                if (validValues.includes(value)) {
                    filters[key] = value; // Solo se permite si el valor es válido para el enum
                } else {
                    throw new Error(`El valor "${value}" no es válido para el campo "${key}". Valores permitidos: ${validValues.join(", ")}`);
                }
                continue;
            }

            // Resto de la lógica de filtros (booleanos, strings, etc.)
            if (key === "dueño") {
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

            if (Array.isArray(value)) {
                filters[key] = { [Op.in]: value }; // Si es un array
            } else {
                filters[key] = value; // Comparación exacta
            }
        }
    }
    return filters;
};

module.exports = buildQueryFilters;
