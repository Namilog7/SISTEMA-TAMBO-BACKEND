require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");
// const insertDataByDefault = require("./src/helpers/dbSetup.js");
// const loadDemoData = require("./src/helpers/loadDemoData.js");
const { PORT } = process.env || 3001;

async function startServer() {
  try {
    await conn.authenticate();
    console.log("Connection has been established successfully.");
    await conn.sync({ force: true });
    console.log("All models were synchronized successfully");
    // await insertDataByDefault();
    // await loadDemoData();
    console.log("All default data synchronized successfully");
    await server.listen(PORT, () => {
      console.log(`Server is active and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect:", error.message);
  }
}

startServer();