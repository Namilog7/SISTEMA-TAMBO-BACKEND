const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "RetiroLeche",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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
            usuario_carga: {
                type: DataTypes.STRING
            }
        },
        { timestamps: true }
    );
};