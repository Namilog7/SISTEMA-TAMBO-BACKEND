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
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            liquidado: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            estado: {
                type: DataTypes.ENUM("ACTIVO", "CANCELADO"),
                allowNull: false,
                defaultValue: "ACTIVO"
            },
            hora_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            usuario_carga: {
                type: DataTypes.STRING(),
                allowNull: false
            }
        },
        { timestamps: true }
    );
};