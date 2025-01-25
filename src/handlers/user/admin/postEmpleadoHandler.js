const bcrypt = require("bcrypt"); // Para hashear la contraseña
const { Empleado } = require("../db");
const { v4: uuidv4 } = require("uuid");

const postEmpleadoHandler = async (req, res) => {
    try {
        const { esAdmin } = req.user; // Supone que tienes middleware para autenticar y pasar info del usuario
        if (!esAdmin) {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
        }

        // Obtener datos del cuerpo de la solicitud
        const { nombre, apellido, email, rol, contraseña } = req.body;

        // Validar campos obligatorios
        if (!nombre || !apellido || !email || !rol || !contraseña) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Verificar que la contraseña cumple con los requisitos mínimos
        if (contraseña.length < 8) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
        }

        // Hashear la contraseña proporcionada
        const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo empleado
        const empleado = await Empleado.create({
            id: uuidv4(),
            nombre,
            apellido,
            email,
            rol,
            contraseña: contraseñaHasheada,
        });

        // Responder con los detalles del empleado (sin contraseña)
        res.status(201).json({
            message: "Empleado creado con éxito.",
            empleado: {
                id: empleado.id,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                email: empleado.email,
                rol: empleado.rol,
            },
        });
    } catch (error) {
        console.error("Error al crear empleado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = postEmpleadoHandler;
