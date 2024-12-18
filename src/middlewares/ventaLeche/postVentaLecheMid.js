const { Tambo, ClienteLeche } = require('../../db'); // Importar modelos
const { body, validationResult } = require('express-validator');

const postVentaLecheMid = [
    // Validar que id_tambo exista en la tabla Tambo
    body('id_tambo')
        .exists().withMessage('El campo "id_tambo" es obligatorio.')
        .isNumeric().withMessage('El campo "id_tambo" debe ser un número.')
        .custom(async (id_tambo) => {
            const tambo = await Tambo.findByPk(id_tambo);
            if (!tambo) {
                throw new Error(`El id_tambo "${id_tambo}" no existe.`);
            }
        }),

    // Validar que id_cliente exista en la tabla Cliente
    body('id_cliente')
        .exists().withMessage('El campo "id_cliente" es obligatorio.')
        .isNumeric().withMessage('El campo "id_cliente" debe ser un número.')
        .custom(async (id_cliente) => {
            console.log(id_cliente)
            const cliente = await ClienteLeche.findByPk(id_cliente);
            if (!cliente) {
                throw new Error(`El id_cliente "${id_cliente}" no existe.`);
            }
        }),

    // Middleware para manejar errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = postVentaLecheMid;
