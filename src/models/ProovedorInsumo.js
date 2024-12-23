const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ProovedorInsumo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            precio: {
                type: DataTypes.FLOAT,
            }
        },
        { timestamps: false }
    );
};