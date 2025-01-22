const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../db");

const loginHandler = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar un token JWT
        const token = jwt.sign(
            {
                id: user.id,
                esAdmin: user.rol === "ADMIN", // Suponiendo que tienes un campo `rol` en la tabla User
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = loginHandler;
