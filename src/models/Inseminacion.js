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
            tipo: {
                type: DataTypes.ENUM("SEXADO", "CONVENCIONAL"),
                allowNull: false
            },
            pajuela: {
                type: DataTypes.STRING,
                allowNull: false
            },
            origen_genetica: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};