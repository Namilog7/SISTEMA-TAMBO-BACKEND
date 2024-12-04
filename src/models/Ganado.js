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
                type: DataTypes.STRING(5),
                unique: true,
            },
            produccionDiaria: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            inseminado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            detalles: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipo: {
                type: DataTypes.ENUM("Vaca", "Ternero", "Novillo")
            }
        },
        { timestamps: false }
    );
};