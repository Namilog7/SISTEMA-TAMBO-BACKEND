const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ControlVeterinario",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            veterinario: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            acta_url: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true }
    );
};