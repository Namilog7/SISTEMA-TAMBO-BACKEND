const { Sector, Tambo, RetiroLeche, Ganado, Caja, Proveedor, ProduccionLeche, conn, ControlLechero } = require("./../db"); // Asegúrate de importar ControlLechero correctamente
const faker = require("faker");
const { v4: uuidv4 } = require('uuid');

const seedData = async () => {
    try {
        // Eliminar datos existentes
        await conn.query('TRUNCATE "Ganados" CASCADE');
        await conn.query('TRUNCATE "ControlLecheros" CASCADE');
        await conn.query('TRUNCATE "InformeLecheros" CASCADE');
        await conn.query('TRUNCATE "Lotes" CASCADE');
        await conn.query('TRUNCATE "ControlGanados" CASCADE');
        await conn.query('TRUNCATE "InseminacionGanados" CASCADE');
        await conn.query('TRUNCATE "Inseminacions" CASCADE');
        await conn.query('TRUNCATE "ControlVeterinarios" CASCADE');
        await conn.query('TRUNCATE "ProduccionLeches" CASCADE');
        await conn.query('TRUNCATE "Liquidacions" CASCADE');
        await conn.query('TRUNCATE "RetiroLeches" CASCADE');
        await conn.query('TRUNCATE "Clientes" CASCADE');
        await conn.query('TRUNCATE "ProveedorInsumos" CASCADE');
        await conn.query('TRUNCATE "Proveedors" CASCADE');
        await conn.query('TRUNCATE "Insumos" CASCADE');
        await conn.query('TRUNCATE "Tambos" CASCADE');
        await conn.query('TRUNCATE "Sectors" CASCADE');

        console.log("Datos existentes eliminados.");

        const sectorId = uuidv4();
        console.log({ sectorId: sectorId });
        // Insertar Sector
        const sector = await Sector.create({
            nombre: "Tambos",
            descripcion: "Sector dedicado a los tambos para la recolección de leche",
            id: sectorId
        });

        // Insertar Tambo
        const tambo = {
            id: uuidv4(),
            id_sector: sector.id, // FK a Sector
            dueño: faker.name.findName(),
            localidad: faker.address.city(),
            contacto: faker.phone.phoneNumber(),
        };
        await Tambo.create(tambo);

        // Insertar RetiroLeche
        const retiroLecheData = [];
        const tambosAll = await Tambo.findAll();
        tambosAll.forEach((tambo) => {
            for (let i = 0; i < 10; i++) {
                retiroLecheData.push({
                    id_tambo: tambo.id, // FK a Tambo
                    cantidad: faker.datatype.number({ min: 700, max: 900 }),
                    fecha: faker.date.past(),
                    liquidado: false,
                    estado: "ACTIVO",
                    hora_carga: "14:00",
                    usuario_carga: "gonza",
                    hora_retiro: "10:00",
                    hora_carga: "10:00",
                    patente_camion: "ASDFW",
                    id: uuidv4()
                });
            }
        });
        await RetiroLeche.bulkCreate(retiroLecheData);

        // Insertar Ganado
        const ganadoData = [];
        for (let i = 0; i < 20; i++) {
            const tipo = faker.helpers.randomize(["VACA", "VAQUILLONA", "TERNERO"]);
            const estado = faker.helpers.randomize(["RECRIA", "ORDEÑE", "ENGORDE"]);

            ganadoData.push({
                caravana: faker.random.alphaNumeric(4),
                tipo,
                estado,
                produccionDiaria: tipo === "VACA" ? faker.datatype.number({ min: 10, max: 30 }) : 0,
                detalles: faker.datatype.boolean() ? faker.lorem.sentence() : null,
                fecha_ingreso: "2024-02-14",
                id_tambo: tambo.id, // Relación con el tambo ID 1
                id: uuidv4()
            });
        }
        await Ganado.bulkCreate(ganadoData);

        // Insertar Proveedor
        const proveedor = {
            nombre: "-",
            localidad: "Cordoba",
            contacto_1: "1547868220",
            saldo: 0.0,
            id: uuidv4()
        };
        console.log(proveedor.id);
        await Proveedor.create(proveedor);

        // Insertar Caja
        const cajaTambo = {
            nombre_caja: "Caja Tambo",
            saldo: 0.0,
            descripcion: "Caja dedicada al sector Tambo",
            id_sector: sector.id,
            id: uuidv4()
        };
        await Caja.create(cajaTambo);

        // Insertar ProduccionLeche
        const produccionLecheData = [];
        let currentDate = new Date("2024-10-01");
        for (let i = 0; i < 90; i++) {
            produccionLecheData.push({
                id: uuidv4(),
                litros: faker.datatype.number({ min: 500, max: 1000 }),
                fecha: currentDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
                hora_recoleccion: "08:00",
                hora_carga: "09:30",
                usuario_carga: "usuario_demo",
                cantidad_animales: faker.datatype.number({ min: 20, max: 50 }),
                aclaracion: faker.datatype.boolean() ? faker.lorem.sentence() : null,
                estado: faker.helpers.randomize(["ACTIVO", "CANCELADO"]),
            });
            currentDate.setDate(currentDate.getDate() + 1); // Incrementar un día
        }
        await ProduccionLeche.bulkCreate(produccionLecheData);

        // Insertar Controles
        const controlesData = [];
        for (let i = 0; i < 30; i++) {
            const litrosOrdeñe1 = faker.datatype.number({ min: 10, max: 30 });
            const litrosOrdeñe2 = faker.datatype.number({ min: 10, max: 30 });
            controlesData.push({
                id: uuidv4(),
                litros_ordeñe1: litrosOrdeñe1,
                litros_ordeñe2: litrosOrdeñe2,
                total: litrosOrdeñe1 + litrosOrdeñe2,
                observacion: faker.lorem.sentence(),
                caravana: faker.random.alphaNumeric(4),
                fecha_control: faker.date.past(),
            });
        }
        await ControlLechero.bulkCreate(controlesData);

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    }
};

module.exports = seedData;
