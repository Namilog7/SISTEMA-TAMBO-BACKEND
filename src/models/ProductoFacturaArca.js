const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ProductoFacturaArca", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unidad_medida: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio_unidad: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        iva: {
            type: DataTypes.INTEGER, //GUARDAR EL CODIGO
            allowNull: false,
        },
        sub_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
};
