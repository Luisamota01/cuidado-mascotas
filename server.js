const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 💡 Permite procesar datos del formulario correctamente
app.use(cors({ origin: "*" }));

let db;

async function iniciarDB() {
    db = await open({
        filename: "./database.db",
        driver: sqlite3.Database,
    });

    await db.run(`
        CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL,
            comentario TEXT NOT NULL,
            fecha TEXT NOT NULL
        )
    `);
}
iniciarDB();

// 🔹 Ruta para obtener la lista de contactos
app.get("/contact/list", async (req, res) => {
    try {
        const contactos = await db.all("SELECT * FROM contactos ORDER BY fecha DESC");
        res.json(contactos);
    } catch (error) {
        console.error("Error al obtener contactos:", error);
        res.status(500).json({ mensaje: "🚨 Error al obtener los contactos." });
    }
});

// 📌 Ruta para agregar un contacto (corregida)
app.post("/contact/add", async (req, res) => {
    const { name, email, comment } = req.body;  // Usar los nombres correctos

    console.log("Datos recibidos:", req.body); // 🐞 Depuración: muestra los datos que llegan desde el formulario

    if (!name || !email || !comment) {  
        return res.status(400).json({ mensaje: "⚠️ Todos los campos son obligatorios." });
    }

    try {
        await db.run("INSERT INTO contactos (nombre, correo, comentario, fecha) VALUES (?, ?, ?, ?)", 
            [name, email, comment, new Date().toISOString()]
        );
        res.json({ mensaje: "✅ ¡Contacto guardado con éxito!" });
    } catch (error) {
        console.error("Error al guardar contacto:", error);
        res.status(500).json({ mensaje: "🚨 Error al guardar el contacto." });
    }
});

// 🔹 Iniciar el servidor
app.listen(10000, () => {
    console.log("🚀 Servidor corriendo en el puerto 10000");
});