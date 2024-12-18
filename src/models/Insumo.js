const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Insumo",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ultimo_ingreso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            precio: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            tipo: {
                type: DataTypes.ENUM(["MEDICAMENTO", "ALIMENTO", "VARIO"]),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};