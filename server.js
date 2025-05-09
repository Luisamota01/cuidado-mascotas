const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a SQLite
const db = new sqlite3.Database("./database.db");

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS contactos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT,
        comentario TEXT
    )
`);

// Ruta para agregar un contacto
app.post("/contact/add", (req, res) => {
    const { nombre, correo, comentario } = req.body;
    db.run(
        "INSERT INTO contactos (nombre, correo, comentario) VALUES (?, ?, ?)",
        [nombre, correo, comentario],
        (err) => {
            if (err) {
                res.status(500).json({ error: "Error al guardar el contacto" });
            } else {
                res.status(200).json({ mensaje: "Contacto guardado con éxito" });
            }
        }
    );
});

// Ruta para obtener la lista de contactos
app.get("/contact/list", (req, res) => {
    db.all("SELECT * FROM contactos", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener los contactos" });
        } else {
            res.json(rows);
        }
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});