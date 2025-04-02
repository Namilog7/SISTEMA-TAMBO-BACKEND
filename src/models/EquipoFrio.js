const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "EquipoFrio",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            litros: {
                type: DataTypes.FLOAT,
            },
            capacidad: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            }
        },
        { timestamps: true }
    );
};
