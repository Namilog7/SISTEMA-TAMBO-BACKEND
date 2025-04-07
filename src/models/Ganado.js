const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ganado",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            caravana: {
                type: DataTypes.STRING(6),
                unique: true,
                allowNull: false,
                validate: {
                    len: [1, 6]
                }
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: false
            },
            detalles: {
                type: DataTypes.STRING,
                allowNull: true
            },
            tipo: {
                type: DataTypes.ENUM("VACA", "TERNERA", "VAQUILLONA"),
                defaultValue: "TERNERA",
                allowNull: true
            },
            estado: {
                type: DataTypes.ENUM("RECRIA", "ORDEÑE", "ENGORDE", "ENFERMA", "DESCARTADA", "LACTANCIA", "SECA", "POST-PARTO", "EN CUARENTENA"),
                allowNull: true
            },
            fecha_inseminado: {
                type: DataTypes.DATE,
                allowNull: true
            },
            inseminado: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            }
        },
        {
            timestamps: false,
            hooks: {
                beforeCreate: (ganado, options) => {
                    if (ganado.estado === "ORDEÑE" && !["VACA", "VAQUILLONA"].includes(ganado.tipo)) {
                        throw new Error("Solo las vacas y vaquillonas pueden estar en estado ORDEÑE");
                    }
                },
                beforeUpdate: (ganado, options) => {
                    if (ganado.estado === "ORDEÑE" && !["VACA", "VAQUILLONA"].includes(ganado.tipo)) {
                        throw new Error("Solo las vacas y vaquillonas pueden estar en estado ORDEÑE");
                    }
                }
            }
        }
    );
};