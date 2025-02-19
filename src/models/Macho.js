const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Macho",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            ternero_contador: {
                type: DataTypes.INTEGER,
            },
            ultimo_ingreso: {
                type: DataTypes.DATE
            },
            movimiento_anotacion: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );
};