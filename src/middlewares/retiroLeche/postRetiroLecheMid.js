const { body, validationResult } = require('express-validator');
const { Tambo } = require("../../db")

const postRetiroLecheMid = [
    // Validar el campo 'cantidad'
    body('cantidad')
        .notEmpty().withMessage('El campo "cantidad" es obligatorio.')
        .isInt({ min: 1 }).withMessage('El campo "cantidad" debe ser un número entero positivo.'),

    // Validar el campo 'fecha'
    body('fecha')
        .notEmpty().withMessage('El campo "fecha" es obligatorio.')
        .isISO8601().withMessage('El campo "fecha" debe ser una fecha válida en formato ISO 8601.'),

    // Validar el campo 'liquidado'
    body('liquidado')
        .notEmpty().withMessage('El campo "liquidado" es obligatorio.')
        .isBoolean().withMessage('El campo "liquidado" debe ser un valor booleano.'),

    // Validar el campo 'id_tambo'
    body('id_tambo')
        .notEmpty().withMessage('El campo "id_tambo" es obligatorio.')
        .isInt({ min: 1 }).withMessage('El campo "id_tambo" debe ser un número entero positivo.')
        .custom(async (value) => {
            const tambo = await Tambo.findByPk(value);
            if (!tambo) {
                throw new Error('El "id_tambo" proporcionado no corresponde a un tambo existente.');
            }
        }),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = postRetiroLecheMid