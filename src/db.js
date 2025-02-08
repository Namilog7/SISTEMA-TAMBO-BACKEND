const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_DEPLOY } = process.env;
const pg = require('pg');
const { ssl } = require("pg/lib/defaults");

const sequelize = new Sequelize(DB_DEPLOY, {
    logging: false,
    native: false,
    dialectModule: pg,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Obtención del nombre del archivo actual
const basename = path.basename(__filename);

// Inicialización de un array para almacenar definiciones de modelos
const modelDefiners = [];

// Lectura de archivos en el directorio 'models' y carga de definiciones de modelos en el array
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Aplicación de cada definicion de modelo en la instancia de Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Conversion de los nombres de modelos a formato capitalizado
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Desestructuracion de los modelos
const {
    Sector,
    Tambo,
    RetiroLeche,
    Liquidacion,
    Insumo,
    Ganado,
    ProduccionLeche,
    ControlVeterinario,
    ControlGanado,
    Inseminacion,
    Cliente,
    ControlLechero,
    InformeLechero,
    Proveedor,
    ProveedorInsumo,
    Lote,
    Caja,
    Transaccion,
    Nota,
    PagoSueldo,
    User,
    TransaccionGanado,
    Macho,
    Producto
} = sequelize.models;

//RELACIONES

Sector.hasOne(Tambo);
Tambo.hasOne(Sector);

Tambo.hasMany(RetiroLeche, {
    foreignKey: 'id_tambo',   // Nombre de la clave foránea en RetiroLeche
    as: 'RetirosLeche',       // Alias para acceder a los Retiros de Leche desde un Tambo
    onDelete: 'CASCADE',      // Si un Tambo se elimina, elimina los registros de RetiroLeche
    onUpdate: 'CASCADE',      // Si cambia el ID del Tambo, actualiza la FK en RetiroLeche
});

RetiroLeche.belongsTo(Tambo, {
    foreignKey: 'id_tambo',   // Nombre de la clave foránea en RetiroLeche
    as: 'Tambo',              // Alias para acceder al Tambo desde un Retiro de Leche
});

Liquidacion.hasMany(RetiroLeche, {
    foreignKey: 'id_liquidacion', // Nombre de la clave foránea en RetiroLeche
    as: 'RetirosLeche',          // Alias para acceder a los Retiros de Leche desde una Liquidación
    onDelete: 'CASCADE',         // Si se elimina una Liquidación, elimina los Retiros de Leche asociados
    onUpdate: 'CASCADE',         // Si cambia el ID de la Liquidación, actualiza la FK en RetiroLeche
});

// RetiroLeche pertenece a una Liquidación
RetiroLeche.belongsTo(Liquidacion, {
    foreignKey: 'id_liquidacion', // Nombre de la clave foránea en RetiroLeche
    as: 'Liquidacion',           // Alias para acceder a la Liquidación desde un Retiro de Leche
});

Sector.hasMany(Insumo, { foreignKey: "id_sector" });
Insumo.belongsTo(Sector, { foreignKey: "id_sector" });

Tambo.hasMany(Ganado, { foreignKey: "id_tambo" });
Ganado.belongsTo(Tambo, { foreignKey: "id_tambo" });


Ganado.belongsToMany(ControlVeterinario, { through: ControlGanado });
ControlVeterinario.belongsToMany(Ganado, { through: ControlGanado });


Sector.hasMany(Cliente, { foreignKey: "id_sector" });
Cliente.belongsTo(Sector, { foreignKey: "id_sector" });

Ganado.hasMany(ControlLechero, { foreignKey: "id_ganado" });
ControlLechero.belongsTo(Ganado, { foreignKey: "id_ganado" });

InformeLechero.hasMany(ControlLechero, { foreignKey: "id_informe" });
ControlLechero.belongsTo(InformeLechero, { foreignKey: "id_informe" });

InformeLechero.hasMany(Lote, { foreignKey: "id_informe" });
Lote.belongsTo(InformeLechero, { foreignKey: "id_informe" });

Lote.hasMany(ControlLechero, { foreignKey: "id_lote" });
ControlLechero.belongsTo(Lote, { foreignKey: "id_lote" });

Insumo.belongsToMany(Proveedor, { through: ProveedorInsumo, foreignKey: 'id_insumo' });
Proveedor.belongsToMany(Insumo, { through: ProveedorInsumo, foreignKey: 'id_proveedor' });

Sector.hasOne(Caja, { foreignKey: "id_sector" });
Caja.hasOne(Sector, { foreignKey: "id_sector" });
Caja.hasMany(Transaccion, { foreignKey: "id_caja" });
Transaccion.belongsTo(Caja, { foreignKey: "id_caja" });

Proveedor.hasMany(Nota, { foreignKey: "id_afectado" });
Nota.belongsTo(Proveedor, { foreignKey: "id_afectado" });
Cliente.hasMany(Nota, { foreignKey: "id_afectado" });
Nota.belongsTo(Cliente, { foreignKey: "id_afectado" });


Ganado.hasOne(TransaccionGanado);
TransaccionGanado.hasOne(Ganado);

Sector.hasMany(Producto, { foreignKey: "id_sector" });
Producto.belongsTo(Sector, { foreignKey: "id_sector" });

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};