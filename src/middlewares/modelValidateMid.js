const { validationResult, check } = require("express-validator");

/**
 * Genera validaciones dinámicas basadas en el modelo proporcionado.
 * @param {Object} model - El modelo con los atributos y sus tipos esperados.
 * @returns {Array} Array de validaciones para express-validator.
 */
const generateValidations = (model) => {
    const validations = [];

    for (const [key, type] of Object.entries(model)) {
        switch (type) {
            case "int":
                validations.push(
                    check(key)
                        .isInt()
                        .withMessage(`El campo '${key}' debe ser un entero.`)
                );
                break;
            case "float":
                validations.push(
                    check(key)
                        .isFloat()
                        .withMessage(`El campo '${key}' debe ser un número flotante.`)
                );
                break;
            case "string":
                validations.push(
                    check(key)
                        .isString()
                        .withMessage(`El campo '${key}' debe ser un texto.`)
                );
                break;
            case "boolean":
                validations.push(
                    check(key)
                        .isBoolean()
                        .withMessage(`El campo '${key}' debe ser un valor booleano.`)
                );
                break;
            case "date":
                validations.push(
                    check(key)
                        .isISO8601()
                        .withMessage(`El campo '${key}' debe ser una fecha válida en formato ISO8601 (YYYY-MM-DD).`)
                );
                break;
            case "time":
                validations.push(
                    check(key)
                        .matches(/^\d{2}:\d{2}:\d{2}$/)
                        .withMessage(`El campo '${key}' debe ser una hora en formato HH:mm:ss.`)
                );
                break;
            default:
                validations.push(
                    check(key)
                        .exists()
                        .withMessage(`El campo '${key}' es obligatorio y debe tener un formato válido.`)
                );
                break;
        }
    }

    return validations;
};

/**
 * Middleware genérico para validar datos basados en un modelo.
 * @param {Object} model - El modelo con los atributos y sus tipos esperados.
 * @returns {Function} Middleware para Express.
 */
const validateModel = (model) => {
    const validations = generateValidations(model);

    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: "Errores en los datos enviados.",
                    errors: errors.array(),
                });
            }
            next();
        },
    ];
};

module.exports = validateModel;
