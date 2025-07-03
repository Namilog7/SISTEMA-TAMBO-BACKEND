const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Venta", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        monto: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        nombre_cliente: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        numero_factura: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
};
