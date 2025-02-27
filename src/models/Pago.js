const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Pago",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }
    );
};