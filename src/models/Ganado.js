const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ganado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            caravana: {
                type: DataTypes.STRING(4),
                unique: true,
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            inseminado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            detalles: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tipo: {
                type: DataTypes.ENUM("Vaca", "Ternero", "Novillo")
            },
            estado: {
                type: DataTypes.ENUM("Recria", "Ordeñe", "Engorde"),
                allowNull: true
            }
        },
        { timestamps: false }
    );
};