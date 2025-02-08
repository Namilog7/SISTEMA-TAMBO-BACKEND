const { Op } = require("sequelize");

const buildQueryFilters = (Model, query) => {
    const filters = {};
    const modelAttributes = Model.rawAttributes;

    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(modelAttributes, key)) {
            let value = query[key];

            // Intentar convertir a número (incluyendo flotantes)
            if (!isNaN(value) && value.trim() !== '') {
                value = parseFloat(value); // Usar parseFloat para aceptar decimales
            }

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

            // Si el atributo es un campo numérico, no usamos Op.iLike
            if (typeof value === 'number') {
                filters[key] = value; // Comparación exacta para números
                continue;
            }

            // Resto de la lógica de filtros (booleanos, strings, etc.)
            if (key) {
                const capitalizedValue = value
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                filters[key] = {
                    [Op.iLike]: `%${capitalizedValue}%`, // Para Postgres
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
