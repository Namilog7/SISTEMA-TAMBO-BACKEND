const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Recria",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            origen: {
                type: DataTypes.STRING,
            },
            caravana: {
                type: DataTypes.STRING(),
                allowNull: true
            },
            peso: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            genero: {
                type: DataTypes.ENUM("HEMBRA", "MACHO"),
                allowNull: false
            },
            caravana_madre: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );
};