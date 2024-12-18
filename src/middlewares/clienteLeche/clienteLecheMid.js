const { body, validationResult } = require('express-validator');

// Middleware para validar los campos de una empresa
const validateEmpresa = [
    // Validar nombre_empresa
    body('nombre_empresa')
        .exists().withMessage('El campo "nombre_empresa" es obligatorio.')
        .isString().withMessage('El campo "nombre_empresa" debe ser un string.')
        .notEmpty().withMessage('El campo "nombre_empresa" no puede estar vacío.'),

    // Validar propietario
    body('propietario')
        .exists().withMessage('El campo "propietario" es obligatorio.')
        .isString().withMessage('El campo "propietario" debe ser un string.')
        .notEmpty().withMessage('El campo "propietario" no puede estar vacío.'),

    // Validar cuit_cuil
    body('cuit_cuil')
        .exists().withMessage('El campo "cuit_cuil" es obligatorio.')
        .matches(/^\d{11}$/).withMessage('El campo "cuit_cuil" debe tener exactamente 11 dígitos numéricos.'),

    // Validar contacto_1
    body('contacto_1')
        .exists().withMessage('El campo "contacto_1" es obligatorio.')
        .isNumeric().withMessage('El campo "contacto_1" debe ser un número.')
        .isLength({ min: 8, max: 15 }).withMessage('El campo "contacto_1" debe tener entre 8 y 15 dígitos.'),

    // Validar contacto_2 (opcional)
    body('contacto_2')
        .optional({ nullable: true })
        .isNumeric().withMessage('El campo "contacto_2" debe ser un número.')
        .isLength({ min: 8, max: 15 }).withMessage('El campo "contacto_2" debe tener entre 8 y 15 dígitos.'),

    // Validar id_tambo
    body('id_tambo')
        .exists().withMessage('El campo "id_tambo" es obligatorio.')
        .isNumeric().withMessage('El campo "id_tambo" debe ser un número.')
        .toInt()
        .custom(value => value > 0).withMessage('El campo "id_tambo" debe ser un número mayor a 0.')
        .custom(async (value, { req }) => {
            const { Tambo } = require('../../db'); // Importa tu modelo de Tambo
            const exists = await Tambo.findByPk(value);
            if (!exists) {
                throw new Error('El id_tambo proporcionado no existe en la base de datos.');
            }
            return true;
        }),

    // Middleware para manejar los errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateEmpresa;
