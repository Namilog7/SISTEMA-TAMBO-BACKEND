const { Sector, Tambo, RetiroLeche, Ganado, Caja, Proovedor, conn } = require("./../db"); // Asegúrate de importar los modelos correctamente
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
        await conn.query('TRUNCATE "ProovedorInsumos" CASCADE');
        await conn.query('TRUNCATE "Proovedors" CASCADE');
        await conn.query('TRUNCATE "Insumos" CASCADE');
        await conn.query('TRUNCATE "Tambos" CASCADE');
        await conn.query('TRUNCATE "Sectors" CASCADE');

        console.log("Datos existentes eliminados.");

        // Insertar Sector
        const sector = await Sector.create({
            nombre: "Tambos",
            descripcion: "Sector dedicado a los tambos para la recolección de leche",
            id: uuidv4()
        });

        // Insertar Tambo
        console.log(sector.id)
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
        const proovedor = {
            nombre: "-",
            localidad: "Cordoba",
            contacto_1: "1547868220",
            saldo: 0.0,
            id: uuidv4()
        };
        await Proovedor.create(proovedor);

        // Insertar Caja
        const cajaTambo = {
            nombre_caja: "Caja Tambo",
            saldo: 0.0,
            descripcion: "Caja dedicada al sector Tambo",
            id_sector: sector.id,
            id: uuidv4()
        };
        await Caja.create(cajaTambo);

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    }
};

module.exports = seedData;
