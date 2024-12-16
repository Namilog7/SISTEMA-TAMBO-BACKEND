const { body, validationResult } = require('express-validator');
const { Sector } = require('../../db'); // Asegúrate de importar el modelo correspondiente

// Middleware para validar los campos de Insumo
const validateInsumo = [
    // Validar el campo "nombre"
    body('nombre')
        .exists().withMessage('El campo "nombre" es obligatorio.')
        .isString().withMessage('El campo "nombre" debe ser un string.')
        .notEmpty().withMessage('El campo "nombre" no puede estar vacío.'),

    // Validar el campo "stock"
    body('stock')
        .exists().withMessage('El campo "stock" es obligatorio.')
        .isNumeric().withMessage('El campo "stock" debe ser un número.')
        .toInt().custom(value => value >= 0).withMessage('El campo "stock" debe ser un número mayor o igual a 0.'),

    // Validar el campo "detalle"
    body('detalle')
        .optional({ nullable: true }) // Permitir que sea opcional o null
        .isString().withMessage('El campo "detalle" debe ser un string.'),

    // Validar el campo "id_sector"
    body('id_sector')
        .exists().withMessage('El campo "id_sector" es obligatorio.')
        .isNumeric().withMessage('El campo "id_sector" debe ser un número.')
        .toInt().custom(async (value) => {
            if (value <= 0) {
                throw new Error('El campo "id_sector" debe ser un número mayor a 0.');
            }
            const sectorExists = await Sector.findByPk(value);
            if (!sectorExists) {
                throw new Error(`El "id_sector" ${value} no existe en la base de datos.`);
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

module.exports = validateInsumo;
