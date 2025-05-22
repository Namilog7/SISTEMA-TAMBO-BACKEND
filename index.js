require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");
const seedData = require("./src/helpers/seedData.js")
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log("🔌 Autenticando DB...");
    await conn.authenticate();
    console.log("✅ DB autenticada.");

    console.log("🧱 Sincronizando modelos...");
    await conn.sync({ force: false, alter: true });
    console.log("✅ Modelos sincronizados.");

    console.log("🌱 Insertando datos iniciales...");
    await seedData();
    console.log("✅ Datos iniciales insertados.");

    console.log(`🚀 Iniciando servidor en puerto ${PORT}`);
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error("🔥 Error en el arranque:", error.message);
  }
}

startServer();