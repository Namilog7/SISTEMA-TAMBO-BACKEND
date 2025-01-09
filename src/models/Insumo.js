const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Insumo",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            tipo: {
                type: DataTypes.ENUM(["MEDICAMENTO", "ALIMENTO", "VARIO"]),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};