const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ProduccionLeche",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            litros: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            hora_recoleccion: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            hora_carga: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            usuario_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            animales: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            aclaracion: {
                type: DataTypes.STRING(),
                allowNull: true
            },
            estado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            hora_retiro: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            aclaracion: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: true }
    );
};