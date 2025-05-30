const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../../db");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(password, user.password);
        if (!contraseñaValida) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar un token JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            token,
            userId: user.id,
            role: user.role,
            email: email,
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

module.exports = loginUser;
