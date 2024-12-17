const { check, validationResult } = require('express-validator');

// Middleware de validación para recolección de leche
const validarRecoleccionLeche = [
    check('litros')
        .isFloat({ gt: 0 }).withMessage('Litros debe ser un número mayor a 0')
        .notEmpty().withMessage('Litros es un campo obligatorio'),

    check('fecha')
        .isISO8601().withMessage('Fecha debe tener un formato válido (YYYY-MM-DD)')
        .notEmpty().withMessage('Fecha es un campo obligatorio'),

    check('hora_recoleccion')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora recolección debe ser en formato HH:MM'),

    check('hora_carga')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora carga debe ser en formato HH:MM'),

    check('usuario_carga')
        .isString().withMessage('Usuario de carga debe ser un texto')
        .notEmpty().withMessage('Usuario de carga es obligatorio'),

    check('animales')
        .isInt({ min: 1 }).withMessage('Animales debe ser un número entero mayor o igual a 1'),

    check('aclaracion')
        .optional()
        .isString().withMessage('Aclaración debe ser un texto'),

    check('estado')
        .isIn(['pendiente', 'completado', 'cancelado']).withMessage('Estado debe ser: pendiente, completado o cancelado'),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validarRecoleccionLeche;
