const {
    Inseminacion,
    Sector,
    Tambo,
    EquipoFrio,
    Ganado,
    SaldoCaja,
    User,
    CajaBancaria,
    CasaPropietario,
    Cliente,
} = require("./../db");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const seedData = async () => {
    try {
        // EquipoFrio
        const equipoFrioTambo = await EquipoFrio.findOne({ where: { nombre: "Tambo" } });
        if (!equipoFrioTambo) {
            await EquipoFrio.create({
                nombre: "Tambo",
                litros: 0,
                capacidad: 13500,
            });
        }

        const equipoFrioFabrica = await EquipoFrio.findOne({ where: { nombre: "Fabrica" } });
        if (!equipoFrioFabrica) {
            await EquipoFrio.create({
                nombre: "Fabrica",
                litros: 0,
                capacidad: 15000,
            });
        }

        const cajaBancaria = await CajaBancaria.findOne({});
        if (!cajaBancaria) {
            await CajaBancaria.create({ saldo: 0 });
        }

        const caja = await SaldoCaja.findOne({});
        if (!caja) {
            await SaldoCaja.create({ saldo: 0 });
        }

        const sectores = [
            { nombre: "Recria", descripcion: "Sector dedicado a la recria" },
            { nombre: "Agricultura", descripcion: "Sector dedicado a la agricultura" },
            { nombre: "Tambos", descripcion: "Sector dedicado a los tambos para la recolección de leche" },
            { nombre: "FabricaQueso", descripcion: "Dedicado a la fabricacion de quesos" },
        ];

        for (const sector of sectores) {
            const exists = await Sector.findOne({ where: { nombre: sector.nombre } });
            if (!exists) {
                await Sector.create(sector);
            }
        }

        const casaPropietario = await CasaPropietario.findOne({ where: { nombre: "Caja" } });
        if (!casaPropietario) {
            await CasaPropietario.create({ nombre: "Caja" });
        }

        const ganadoExists = await Ganado.findOne();
        if (!ganadoExists) {
            const ganadoData = [];
            for (let i = 0; i < 20; i++) {
                const tipo = faker.helpers.randomize(["VACA", "VAQUILLONA", "TERNERA"]);
                const estado = tipo === "TERNERA" ? "RECRIA" : faker.helpers.randomize(["ORDEÑE", "ENGORDE"]);

                ganadoData.push({
                    caravana: faker.random.alphaNumeric(4),
                    tipo,
                    estado,
                    produccionDiaria: tipo === "VACA" ? faker.datatype.number({ min: 10, max: 30 }) : 0,
                    detalles: faker.datatype.boolean() ? faker.lorem.sentence() : null,
                    fecha_ingreso: "2024-02-14",
                    id: uuidv4(),
                });
            }
            await Ganado.bulkCreate(ganadoData);
        }

        const users = [
            { email: "admin@administracion.com", role: "ADMIN" },
            { email: "admin@tambo.com", role: "EMPLEADO" },
            { email: "admin@fabrica.com", role: "EMPLEADO" },
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash("admin123", 10);
                await User.create({
                    id: uuidv4(),
                    email: userData.email,
                    password: hashedPassword,
                    role: userData.role,
                });
                console.log(`Usuario ${userData.email} creado con éxito.`);
            }
        }

        const fabricaSector = await Sector.findOne({ where: { nombre: "FabricaQueso" } });
        const cliente = await Cliente.findOne({ where: { nombre_empresa: "CONSUMIDOR FINAL" } });

        if (!cliente && fabricaSector) {
            await Cliente.create({
                id: uuidv4(),
                nombre_empresa: "CONSUMIDOR FINAL",
                cuit_cuil: "0",
                contacto_1: "-",
                id_sector: fabricaSector.id,
                saldo: 0,
                localidad: "-",
            });
            console.log("Se creó el cliente CONSUMIDOR FINAL.");
        }

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    }
};

module.exports = seedData;
