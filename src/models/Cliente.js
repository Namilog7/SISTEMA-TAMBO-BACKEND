const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cliente",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre_empresa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            propietario: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cuit_cuil: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            contacto_1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contacto_2: {
                type: DataTypes.STRING,
                allowNull: false
            },
            numero_cuenta: {
                type: DataTypes.STRING,
                allowNull: true
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: true
            }
        },
        { timestamps: false }
    );
};