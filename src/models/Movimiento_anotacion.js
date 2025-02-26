const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Movimiento_anotacion", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        texto: {
            type: DataTypes.STRING,
        },
        archivo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        terneros_afectados: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tipo_movimiento: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};
