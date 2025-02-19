const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Insumo",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            tipo: {
                type: DataTypes.ENUM(["MEDICAMENTO", "ALIMENTO", "VARIO", "FABRICA"]),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};