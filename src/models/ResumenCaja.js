const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'ResumenCaja', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        detalle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        importe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        metodos_pago: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.ENUM("INGRESO", "EGRESO"),
            allowNull: false
        }
    })
};