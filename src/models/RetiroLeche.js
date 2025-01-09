const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "RetiroLeche",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
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
            encargado_retiro: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hora_retiro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            aclaracion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            patente_camion: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: true }
    );
};