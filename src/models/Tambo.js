const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Tambo",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            dueño: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            localidad: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contacto: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            id_sector: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Sectors',
                    key: 'id',
                },
            },
        },
        { timestamps: false }
    );
};