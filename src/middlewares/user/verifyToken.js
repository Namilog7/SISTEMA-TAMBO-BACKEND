const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware para verificar y validar el token JWT.
 * Opcionalmente, verifica si el usuario tiene el rol necesario.
 *
 * @param {string} [requiredRole] - (Opcional) Rol requerido para acceder al recurso.
 * @returns {Function} Middleware de autorización.
 */
const verifyToken = (requiredRole) => {
    return (req, res, next) => {
        try {
            // Obtener el token del encabezado Authorization
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(403).json({ message: "Token no proporcionado o inválido." });
            }

            const token = authHeader.split(" ")[1];

            // Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Adjuntar la información del usuario al objeto req
            req.user = decoded;

            // Verificar el rol, si se especifica
            if (requiredRole && decoded.esAdmin !== (requiredRole === "ADMIN")) {
                return res.status(403).json({ message: "Acceso denegado. Rol no autorizado." });
            }

            next();
        } catch (error) {
            console.error("Error al verificar el token:", error.message);
            res.status(401).json({ message: "Token inválido o expirado." });
        }
    };
};

module.exports = verifyToken;
