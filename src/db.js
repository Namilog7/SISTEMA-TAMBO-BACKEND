const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_DEPLOY, DB_DEV } = process.env;
const pg = require("pg");

const sequelize = new Sequelize(DB_DEV, {
    logging: false,
    native: false,
    // dialectModule: pg,
    dialect: "postgres",
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    // },
});

// Obtención del nombre del archivo actual
const basename = path.basename(__filename);

// Inicialización de un array para almacenar definiciones de modelos
const modelDefiners = [];

// Lectura de archivos en el directorio 'models' y carga de definiciones de modelos en el array
fs.readdirSync(path.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Aplicación de cada definicion de modelo en la instancia de Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Conversion de los nombres de modelos a formato capitalizado
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Desestructuracion de los modelos
const {
    Sector,
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
    SaldoCaja,
    Nota,
    PagoSueldo,
    User,
    Macho,
    Producto,
    Movimiento_anotacion,
    CompraLeche,
    LoteSiembra,
    EstadoSiembra,
    ResumenCuenta,
    Pago,
    MetodoPago,
    Ingreso_recria,
    Recria,
    GastoIngreso,
    MetodoGastoIngreso,
    Venta,
    VentaProducto,
    TamboProveedor,
    Factura,
    Remito,
    CasaPropietario,
    CompromisoDePago,
    CasaPagoEventual,
    Comprobante,
    Transferencia,
    Cuenta,
    MesesCompromiso,
    Sistema_movimiento,
    Empleado,
} = sequelize.models;

//RELACIONES

Empleado.hasOne(User, {
    foreignKey: {
        name: "id_empleado",
        allowNull: true,
    },
    onDelete: "CASCADE",
});

User.belongsTo(Empleado, {
    foreignKey: {
        name: "id_empleado",
        allowNull: true,
    },
});

Sector.hasMany(RetiroLeche, { foreignKey: "id_sector" });
RetiroLeche.belongsTo(Sector, { foreignKey: "id_sector" });

Cliente.hasMany(RetiroLeche, { foreignKey: "id_cliente" });
RetiroLeche.belongsTo(Cliente, { foreignKey: "id_cliente" });

Sector.hasMany(CompraLeche, { foreignKey: "id_sector" });
CompraLeche.belongsTo(Sector, { foreignKey: "id_sector" });

TamboProveedor.hasMany(CompraLeche, { foreignKey: "id_tambo_proveedor" });
CompraLeche.belongsTo(TamboProveedor, { foreignKey: "id_tambo_proveedor" });

Liquidacion.hasMany(RetiroLeche, {
    foreignKey: "id_liquidacion", // Nombre de la clave foránea en RetiroLeche
    as: "RetirosLeche", // Alias para acceder a los Retiros de Leche desde una Liquidación
    onDelete: "CASCADE", // Si se elimina una Liquidación, elimina los Retiros de Leche asociados
    onUpdate: "CASCADE", // Si cambia el ID de la Liquidación, actualiza la FK en RetiroLeche
});

// RetiroLeche pertenece a una Liquidación
RetiroLeche.belongsTo(Liquidacion, {
    foreignKey: "id_liquidacion", // Nombre de la clave foránea en RetiroLeche
    as: "Liquidacion", // Alias para acceder a la Liquidación desde un Retiro de Leche
});

Sector.hasMany(Insumo, { foreignKey: "id_sector" });
Insumo.belongsTo(Sector, { foreignKey: "id_sector" });

Sector.hasMany(Ganado, { foreignKey: "id_sector" });
Ganado.belongsTo(Sector, { foreignKey: "id_sector" });

Ganado.belongsToMany(ControlVeterinario, { through: ControlGanado });
ControlVeterinario.belongsToMany(Ganado, { through: ControlGanado });

Sector.hasMany(Cliente, { foreignKey: "id_sector" });
Cliente.belongsTo(Sector, { foreignKey: "id_sector" });

Sector.hasMany(Proveedor, { foreignKey: "id_sector" });
Proveedor.belongsTo(Sector, { foreignKey: "id_sector" });

Ganado.hasMany(ControlLechero, { foreignKey: "id_ganado" });
ControlLechero.belongsTo(Ganado, { foreignKey: "id_ganado" });

InformeLechero.hasMany(ControlLechero, { foreignKey: "id_informe" });
ControlLechero.belongsTo(InformeLechero, { foreignKey: "id_informe" });

InformeLechero.hasMany(Lote, { foreignKey: "id_informe" });
Lote.belongsTo(InformeLechero, { foreignKey: "id_informe" });

Lote.hasMany(ControlLechero, { foreignKey: "id_lote" });
ControlLechero.belongsTo(Lote, { foreignKey: "id_lote" });

Insumo.belongsToMany(Proveedor, { through: ProveedorInsumo, foreignKey: "id_insumo" });
Proveedor.belongsToMany(Insumo, { through: ProveedorInsumo, foreignKey: "id_proveedor" });

GastoIngreso.hasMany(MetodoGastoIngreso, { foreignKey: "id_gasto_ingreso" });
MetodoGastoIngreso.belongsTo(GastoIngreso, { foreignKey: "id_gasto_ingreso" });

Sector.hasMany(GastoIngreso, { foreignKey: "id_sector" });
GastoIngreso.belongsTo(Sector, { foreignKey: "id_sector" });

/* Nota.belongsTo(Cliente, { foreignKey: "id_afectado", allowNull: true, onDelete: "SET NULL" });
Nota.belongsTo(Proveedor, { foreignKey: "id_afectado", allowNull: true, onDelete: "SET NULL" });

Cliente.hasMany(Nota, { foreignKey: "id_afectado", constraints: false });
Proveedor.hasMany(Nota, { foreignKey: "id_afectado", constraints: false }); */

Nota.belongsTo(Cliente, {
    foreignKey: "id_afectado",
    constraints: false,
});

Nota.belongsTo(Proveedor, {
    foreignKey: "id_afectado",
    constraints: false,
});

Nota.belongsTo(Empleado, {
    foreignKey: "id_afectado",
    constraints: false,
});

Cliente.hasMany(Nota, {
    foreignKey: "id_afectado",
    constraints: false,
});

Proveedor.hasMany(Nota, {
    foreignKey: "id_afectado",
    constraints: false,
});

Empleado.hasMany(Nota, {
    foreignKey: "id_afectado",
    constraints: false,
});

Sector.hasMany(Comprobante, { foreignKey: "id_sector" });
Comprobante.belongsTo(Sector, { foreignKey: "id_sector" });

Sector.hasMany(Producto, { foreignKey: "id_sector" });
Producto.belongsTo(Sector, { foreignKey: "id_sector" });

LoteSiembra.hasMany(EstadoSiembra, {
    foreignKey: "id_lote",
    onDelete: "CASCADE",
});

EstadoSiembra.belongsTo(LoteSiembra, {
    foreignKey: "id_lote",
});

Cliente.hasMany(ResumenCuenta, {
    foreignKey: {
        name: "id_cliente",
        allowNull: true,
    },
});

ResumenCuenta.belongsTo(Cliente, {
    foreignKey: {
        name: "id_cliente",
        allowNull: true,
    },
});

Proveedor.hasMany(ResumenCuenta, {
    foreignKey: {
        name: "id_proveedor",
        allowNull: true,
    },
});

ResumenCuenta.belongsTo(Proveedor, {
    foreignKey: {
        name: "id_proveedor",
        allowNull: true,
    },
});

Empleado.hasMany(ResumenCuenta, {
    foreignKey: {
        name: "id_empleado",
        allowNull: true,
    },
});

ResumenCuenta.belongsTo(Empleado, {
    foreignKey: {
        name: "id_empleado",
        allowNull: true,
    },
});

Pago.belongsTo(Cliente, { foreignKey: "id_cliente", allowNull: true });
Cliente.hasMany(Pago, { foreignKey: "id_cliente" });

Pago.belongsTo(Proveedor, { foreignKey: "id_proveedor", allowNull: true });
Proveedor.hasMany(Pago, { foreignKey: "id_proveedor" });

Pago.belongsTo(Empleado, { foreignKey: "id_empleado", allowNull: true });
Empleado.hasMany(Pago, { foreignKey: "id_empleado" });

Pago.hasMany(MetodoPago, { foreignKey: "id_pago" });
MetodoPago.belongsTo(Pago, { foreignKey: "id_pago" });

Ingreso_recria.hasMany(Recria, { foreignKey: "id_ingreso" });
Recria.belongsTo(Ingreso_recria, { foreignKey: "id_ingreso" });

Producto.belongsToMany(Venta, { through: VentaProducto });
Venta.belongsToMany(Producto, { through: VentaProducto });

Cliente.hasMany(Venta, {
    foreignKey: "id_cliente",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Venta.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// id_compra
TamboProveedor.hasMany(CompraLeche, { foreignKey: "id_tambo_proveedor" });
CompraLeche.belongsTo(TamboProveedor, { foreignKey: "id_tambo_proveedor" });

Factura.belongsTo(Venta, { foreignKey: "id_factura" });
Venta.hasOne(Factura, { foreignKey: "id_factura" });

CasaPropietario.hasMany(CompromisoDePago, {
    foreignKey: "id_propietario",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
CompromisoDePago.belongsTo(CasaPropietario, {
    foreignKey: "id_propietario",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
CompromisoDePago.hasMany(MesesCompromiso, { foreignKey: "id_compromiso" });
MesesCompromiso.belongsTo(CompromisoDePago, { foreignKey: "id_compromiso" });

Cuenta.hasMany(Transferencia, {
    foreignKey: "id_cuenta",
    as: "transferenciasOrigen",
});

Cuenta.hasMany(Transferencia, {
    foreignKey: "id_cuenta_destino",
    as: "transferenciasDestino",
});

Transferencia.belongsTo(Cuenta, {
    foreignKey: "id_cuenta",
    as: "cuentaOrigen",
});

Transferencia.belongsTo(Cuenta, {
    foreignKey: "id_cuenta_destino",
    as: "cuentaDestino",
});

module.exports = {
    ...sequelize.models,
    conn: sequelize,
};
