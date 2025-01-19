const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Empleado",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre_completo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            localidad: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contacto: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dni: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cuit_cuil: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contraseña: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: false }
    );
};