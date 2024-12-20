const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ganado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
                type: DataTypes.ENUM("VACA", "TERNERO", "NOVILLO")
            },
            estado: {
                type: DataTypes.ENUM("RECRIA", "ORDEÑE", "ENGORDE"),
                allowNull: true
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