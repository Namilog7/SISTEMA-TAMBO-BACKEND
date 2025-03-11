const bcrypt = require("bcrypt"); // Para hashear la contraseña
const { User } = require("../../../db");
const limitRegister = require("../../../helpers/limitRegister");

const postEmpleadoHandler = async (req, res) => {
    const { email, role, password, nombre, apellido, localidad, contacto, dni, cuit_cuil } = req.body;
    try {
        await limitRegister(User)
        const user = req.user;

        if (user.role !== "ADMIN") {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
        }

        if (!email || !role || !password) {
            return res.status(400).json({ message: "Faltan datos" });
        }

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
