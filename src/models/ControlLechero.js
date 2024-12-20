const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlLechero",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            litros_ordeñe1: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            litros_ordeñe2: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            observacion: {
                type: DataTypes.STRING,
                allowNull: true
            }


        }
    );
};