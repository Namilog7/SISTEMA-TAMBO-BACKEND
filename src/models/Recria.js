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
            caravana: {
                type: DataTypes.STRING(),
                allowNull: false
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
            }
        }
    );
};