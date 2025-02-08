const { body, validationResult } = require('express-validator');

const postTamboMid = [
    // Validar el campo 'dueño'
    body('dueño')
        .notEmpty().withMessage('El campo "dueño" es obligatorio.')
        .isString().withMessage('El campo "dueño" debe ser un texto válido.'),

    // Validar el campo 'localidad'
    body('localidad')
        .notEmpty().withMessage('El campo "localidad" es obligatorio.')
        .isString().withMessage('El campo "localidad" debe ser un texto válido.'),

    // Validar el campo 'contacto'
    body('contacto')
        .notEmpty().withMessage('El campo "contacto" es obligatorio.')
        .isString().withMessage('El campo "contacto" debe ser un texto válido.')
        .isLength({ min: 5, max: 50 }).withMessage('El campo "contacto" debe tener entre 5 y 50 caracteres.'),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = postTamboMid;