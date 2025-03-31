const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "CasaPropietario",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            localidad: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contacto_1: {
                type: DataTypes.STRING,
                allowNull: true
            },

        },
        { timestamps: false }
    );
};