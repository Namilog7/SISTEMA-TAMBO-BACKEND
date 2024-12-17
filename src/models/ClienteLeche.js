const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ClienteLeche",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
                type: DataTypes.INTEGER,
                allowNull: false
            },
            contacto_2: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};