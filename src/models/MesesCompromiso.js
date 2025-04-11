const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "MesesCompromiso",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            monto_pagado: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            estado_pago: {
                type: DataTypes.ENUM("PENDIENTE", "PAGADO"),
                allowNull: false
            }

        },
        { timestamps: false }
    );
};