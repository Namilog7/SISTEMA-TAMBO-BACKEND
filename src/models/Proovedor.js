const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Proovedor",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contacto_1: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contacto_2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            localidad: {
                type: DataTypes.STRING,
                allowNull: false
            },
            saldo: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};