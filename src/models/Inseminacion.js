const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Inseminacion",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            inseminador: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_carga: {
                type: DataTypes.DATE,
            },
            fecha: {
                type: DataTypes.DATE,
            },
            hora_carga: {
                type: DataTypes.STRING
            },
            aclaracion: {
                type: DataTypes.STRING
            },
            sexado: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pajuela: {
                type: DataTypes.STRING,
                allowNull: false
            },
            caravana: {
                type: DataTypes.STRING,
                allowNull: false
            },
            aclaracion: {
                type: DataTypes.STRING
            },
            url_image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true }
    );
};