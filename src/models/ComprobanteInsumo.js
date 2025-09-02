const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ComprobanteInsumo", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producto_servicio: {
            type: DataTypes.ENUM("PRODUCTO", "INSUMO"),
            allowNull: false,
            defaultValue: "PRODUCTO"
        },
        cantidad: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        iva: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
};
