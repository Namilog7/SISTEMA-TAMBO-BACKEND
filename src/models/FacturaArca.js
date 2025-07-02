const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("FacturaArca", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM("A", "B"),
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        fecha_emision: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        // fecha_serv_desde: {
        //     type: DataTypes.DATEONLY,
        //     allowNull: true,
        // },
        // fecha_serv_hasta: {
        //     type: DataTypes.DATEONLY,
        //     allowNull: true,
        // },
        // fecha_vencimiento_pago: {
        //     type: DataTypes.DATEONLY,
        //     allowNull: true,
        // },
        condicion_venta: {
            type: DataTypes.ENUM("Contado", "Crédito", "A plazos", "Porcentaje de pago", "Condiciones especiales"),
            allowNull: false,
        },
        numero_documento: {
            type: DataTypes.STRING(11),
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        nombre_destinatario: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        divisa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        importeNeto: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        condicion_frente_al_iva: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        cae: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cae_vencimiento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qr: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        punto_venta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
