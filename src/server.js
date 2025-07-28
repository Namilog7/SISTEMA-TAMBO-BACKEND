const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();


server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ limit: "10mb", extended: true }));

server.use(morgan("dev"));
server.use(cors({
    origin: [
        "https://test-tambo-sdf3.vercel.app",
        "test-tambo.vercel.app",
        "http://localhost:3000", // Usen este puerto ee
        "http://localhost:5173",
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

server.use(router);

// Middleware de manejo de errores
server.use((err, req, res, next) => {
    // Determina el codigo de estado y el mensaje de error
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).json({ error: message });
});

module.exports = server;