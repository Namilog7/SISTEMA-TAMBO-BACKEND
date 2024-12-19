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
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            hora_recoleccion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            usuario_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cantidad_animales: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM("ACTIVO", "CANCELADO"),
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