const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "EquipoFrio",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            litros: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    min: { args: [0], msg: "Los litros no pueden ser negativos." },
                    litrosNoMayorCapacidad(value) {
                        if (value !== null && this.capacidad !== null && value > this.capacidad) {
                            throw new Error("Los litros no pueden ser mayores a la capacidad.");
                        }
                    }
                }
            },
            capacidad: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    min: { args: [0], msg: "La capacidad no puede ser negativa." }
                }
            }
        },
        { timestamps: true }
    );
};
