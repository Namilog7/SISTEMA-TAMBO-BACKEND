const bcrypt = require("bcrypt");
const { User } = require("../../db");

/**
 * Verifica si un usuario existe y si la contraseña proporcionada es válida.
 * @param {string} email - El nombre de usuario o email.
 * @param {string} contraseña - La contraseña proporcionada.
 * @returns {Promise<Object|null>} - El usuario si las credenciales son válidas, null si no lo son.
 */
const loginUser = async (email, contraseña) => {
    try {
        s
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);

        if (!isPasswordValid) {
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error en authenticateUser:", error);
        throw new Error("Error al autenticar al usuario.");
    }
};

module.exports = loginUser;
