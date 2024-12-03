const { Sequelize } = require("sequelize");
const { Sector, Tambo, RetiroLeche } = require("./../db");  // Asegúrate de importar los modelos correctamente
const faker = require("faker");
const { DB_DEPLOY } = process.env

const sequelize = new Sequelize(DB_DEPLOY);

const seedData = async () => {
    try {
        const sector = await Sector.create({
            nombre: "Tambos",
            descripcion: "Sector dedicado a los tambos para la recolección de leche",
        });

        // Crear 6 tambos para el sector creado
        const tambos = [];
        for (let i = 0; i < 6; i++) {
            tambos.push({
                id_sector: sector.id, // FK a Sector
                dueño: faker.name.findName(),  // Generar un nombre aleatorio para el dueño
                localidad: faker.address.city(),  // Generar una ciudad aleatoria
                contacto: faker.phone.phoneNumber(),  // Generar un número de teléfono aleatorio
            });
        }
        await Tambo.bulkCreate(tambos);

        const retiroLecheData = [];
        const tambosAll = await Tambo.findAll();
        tambosAll.forEach((tambo) => {
            for (let i = 0; i < 10; i++) {
                retiroLecheData.push({
                    id_tambo: tambo.id, // FK a Tambo
                    cantidad: faker.datatype.number({ min: 700, max: 900 }),  // Cantidad aleatoria de leche
                    fecha: faker.date.past(),  // Fecha aleatoria del retiro
                    liquidado: false,
                });
            }
        });
        await RetiroLeche.bulkCreate(retiroLecheData);

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    } finally {
        sequelize.close();
    }
};

// Ejecutar la función de semilla
module.exports = seedData