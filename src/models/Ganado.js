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
            recria: {
                type: DataTypes.BOOLEAN
            },
            /*    estado: {
                   type: DataTypes.STRING,
                   allowNull: false
               } */
        },
        { timestamps: false }
    );
};