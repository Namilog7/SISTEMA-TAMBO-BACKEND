const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlLechero",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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
            },
            caravana: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );
};