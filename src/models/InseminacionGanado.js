const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InseminacionGanado",
        {
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
            }
        }
    );
};