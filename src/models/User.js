const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('EMPLEADO', 'ADMIN'),
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        localidad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contacto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cuit_cuil: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
};