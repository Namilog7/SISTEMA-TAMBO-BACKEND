const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Macho",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            terneroContador: {
                type: DataTypes.INTEGER,
            },
            aclaracion: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }
    );
};