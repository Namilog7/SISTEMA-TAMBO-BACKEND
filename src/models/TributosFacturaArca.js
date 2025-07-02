const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("TributosFacturaArca", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alicuota: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
};
