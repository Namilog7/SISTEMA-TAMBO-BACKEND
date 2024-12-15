const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InseminacionGanado",
        {
            fecha: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        }
    );
};