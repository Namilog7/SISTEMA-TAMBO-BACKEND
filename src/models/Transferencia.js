const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        'Transferencia', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM("PENDIENTE", "PROCESO", "ACREDITADO", "RECHAZADA", "ENVIADA", "CONFIRMADA", "FALLIDA"),
            allowNull: false
        },
        cuenta_origen: {
            type: DataTypes.STRING, // string
        },
        cuenta_destino: {
            type: DataTypes.STRING  // string
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
};