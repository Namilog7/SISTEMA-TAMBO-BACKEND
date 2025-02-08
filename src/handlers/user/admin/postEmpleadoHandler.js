const bcrypt = require("bcrypt"); // Para hashear la contraseña
const { User } = require("../../../db");

const postEmpleadoHandler = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
        }

        const { email, role, password, nombre, apellido, localidad, contacto, dni, cuit_cuil } = req.body;

        // Validar campos obligatorios
        if (!email || !role || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        // Verificar que la contraseña cumple con los requisitos mínimos
        if (password.length < 5) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 5 caracteres." });
        }

        const passwordHasheada = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario 
        const empleado = await User.create({
            email,
            role,
            password: passwordHasheada,
            nombre,
            apellido,
            localidad,
            contacto,
            dni,
            cuit_cuil
        });

        // Responder con los detalles del empleado (sin contraseña)
        res.status(201).json({
            message: "Empleado creado con éxito.",
            empleado: {
                id: empleado.id,
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                email: empleado.email,
                role: empleado.role,
            },
        });
    } catch (error) {
        console.error("Error al crear empleado:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = postEmpleadoHandler;
