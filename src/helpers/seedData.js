const { Inseminacion, Sector, Tambo, EquipoFrio, Ganado, SaldoCaja, User, CajaBancaria } = require("./../db"); // Asegúrate de importar el modelo User
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const seedData = async () => {
    try {
        /*         // Eliminar datos existentes
                await conn.query('TRUNCATE "Users" CASCADE'); // Asegúrate de truncar la tabla de usuarios si es necesario
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
                console.log({ sectorIdTambo: sectorId });
        
                // Insertar Sector
                const sector = await Sector.create({
                    nombre: "Tambos",
                    descripcion: "Sector dedicado a los tambos para la recolección de leche",
                    id: sectorId
                });
        
                const fabricaId = uuidv4()
                const fabrica = await Sector.create({
                    nombre: "FabricaQueso",
                    descripcion: "Dedicado a la fabricacion de quesos",
                })
                await Caja.create({
                    nombre_caja: "Fabrica_Queso",
                    saldo: 0.0,
                    descripcion: "Caja de Fabrica de Quesos",
                    id_sector: fabrica.id
                })
        
                // Insertar Tambo
                const tambo = {
                    id: uuidv4(),
                    id_sector: sector.id, // FK a Sector
                    dueño: faker.name.findName(),
                    localidad: faker.address.city(),
                    contacto: faker.phone.phoneNumber(),
                };
                await Tambo.create(tambo);
                q
                */
        // Insertar Ganado
        // Insertar Sector
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
            await CajaBancaria.create({
                saldo: 0,
            });
        }
        const caja = await SaldoCaja.findOne({});
        if (!caja) {
            await SaldoCaja.create({
                saldo: 0,
            });
        }
        await Sector.create({
            nombre: "Recria",
            descripcion: "Sector dedicado a la recria",
        });
        await Sector.create({
            nombre: "Agricultura",
            descripcion: "Sector dedicado a la agricultura",
        });

        const tambo = await Sector.create({
            nombre: "Tambos",
            descripcion: "Sector dedicado a los tambos para la recolección de leche",
        });

        const fabricaId = uuidv4();
        const fabrica = await Sector.create({
            nombre: "FabricaQueso",
            descripcion: "Dedicado a la fabricacion de quesos",
        });

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
        /*
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
                await ProduccionLeche.bulkCreate(produccionLecheData); */

        // Insertar Usuario Admin
        const hashedPassword = await bcrypt.hash("admin123", 10); // Encripta la contraseña
        const adminUser = {
            id: uuidv4(),
            nombre: "Admin",
            apellido: "Tambo",
            email: "admin@example.com",
            password: hashedPassword,
            role: "ADMIN", // Asigna el rol de administrador
            localidad: "Calchin",
            dni: "4051086506",
            contacto: "154222529",
            cuil_cuit: "146014653165",
        };
        console.log(adminUser);
        await User.create(adminUser);
        /* 
                await Macho.create({ terneroContador: 0 }) */

        console.log("Datos semilla insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar los datos de semilla:", error);
    }
};

module.exports = seedData;
