const { Sector, Tambo, RetiroLeche, Ganado, Insumo } = require("./../db");  // Asegúrate de importar los modelos correctamente
const faker = require("faker");


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
                    estado: "ACTIVO",
                    hora_carga: 14,
                    usuario_carga: "gonza",

                });
            }
        });
        await RetiroLeche.bulkCreate(retiroLecheData);

        const ganadoData = [];

        for (let i = 0; i < 80; i++) {
            const tipo = faker.helpers.randomize(['Vaca', 'Novillo', 'Ternero']);
            const estado = faker.helpers.randomize(["Recria", "Ordeñe", "Engorde"])

            ganadoData.push({
                caravana: faker.random.alphaNumeric(4), // Genera un UUID único para la caravana
                tipo,
                estado,
                produccionDiaria: tipo === 'Vaca' ? faker.datatype.number({ min: 10, max: 30 }) : 0, // Solo "Vaca" produce leche
                detalles: faker.datatype.boolean() ? faker.lorem.sentence() : null, // Detalles aleatorios o null
                fecha_ingreso: "2024-02-14",
                id_tambo: 1 // Relación con el tambo ID 1
            });
        }
        await Ganado.bulkCreate(ganadoData);
        console.log('80 registros de Ganado creados con éxito.');

        const insumos = [];
        for (let i = 0; i < 10; i++) { // Generar 10 insumos por sector
            let tipo = faker.helpers.randomize(['MEDICAMENTO', 'ALIMENTO', 'VARIO']);
            insumos.push({
                nombre: faker.commerce.productName(), // Nombre del insumo
                stock: faker.datatype.number({ min: 10, max: 100 }), // Stock entre 10 y 100
                detalle: faker.commerce.productDescription(), // Descripción del insumo
                id_sector: 1, // ID del sector
                ultimo_ingreso: "2024-02-12",
                precio: 12,
                tipo: tipo
            });
        }

        // Crear los insumos en la base de datos
        await Insumo.bulkCreate(insumos);
        console.log('Insumos creados exitosamente');

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    }
};

module.exports = seedData