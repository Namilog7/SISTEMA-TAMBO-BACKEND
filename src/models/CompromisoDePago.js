const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "CompromisoDePago",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            nombre_servicio: {
                type: DataTypes.STRING,
                allowNull: false,
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