const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Sector",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        { timestamps: false }
    );
};