const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Cuenta', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        nombre_cuenta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alias_cbu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saldo: {
            type: DataTypes.FLOAT
        },
        // Crear tabla Cuentas, nombreCuenta, alias-cbu, saldo

    })
};