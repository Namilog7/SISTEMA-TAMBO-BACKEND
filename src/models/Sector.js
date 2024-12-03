const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Sector",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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