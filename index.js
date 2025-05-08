require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");
const seedData = require("./src/helpers/seedData.js")
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    /*  await conn.authenticate();
     console.log("Connection has been established successfully.");
     await conn.sync({ force: false, alter: true });
     console.log("All models were synchronized successfully");
     await seedData();
     console.log("All default data synchronized successfully"); */
    console.log(`📢 Escuchando en el puerto: ${PORT}`);
    server.listen(PORT, () => {
      console.log(`Server is active and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect:", error.message);
  }
}

startServer();