const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "VentaLeche",
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
            hora_retiro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hora_carga: {
                type: DataTypes.STRING,
                allowNull: false
            },
            encargado_retiro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            patente_camion: {
                type: DataTypes.STRING(10)
            },
            usuario_carga: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            aclaracion: {
                type: DataTypes.STRING()
            }
        },
        { timestamps: true }
    );
};