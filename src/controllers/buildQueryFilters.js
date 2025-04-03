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
            if (value === "true" || value === "false") {
                filters[key] = value === "true";
                continue;
            }
            if (typeof value === "string") {
                filters[key] = {
                    [Op.iLike]: `%${value}%`
                };
                continue;
            }

        }
    }
    console.log(filters)
    return filters;
};

module.exports = buildQueryFilters;
