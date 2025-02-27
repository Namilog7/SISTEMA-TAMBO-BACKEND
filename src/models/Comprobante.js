const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Comprobante",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            detalle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            fecha: {
                type: DataTypes.STRING,
            },
            url_image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        { timestamps: true }
    );
};