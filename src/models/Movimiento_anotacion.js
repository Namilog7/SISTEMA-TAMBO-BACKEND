const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Movimiento_anotacion",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            fecha: {
                type: DataTypes.DATE
            },
            texto: {
                type: DataTypes.STRING
            }
        }
    );
};