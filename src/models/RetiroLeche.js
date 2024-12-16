const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "RetiroLeche",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            liquidado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            estado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            hora_carga: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { timestamps: true }
    );
};