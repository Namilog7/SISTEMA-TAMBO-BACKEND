const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Sector",
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
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        { timestamps: false }
    );
};