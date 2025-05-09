const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();

// Configurar body-parser para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conexión con SQLite establecida.');
    }
});

// Crear la tabla de contactos si no existe
db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    comment TEXT NOT NULL,
    ip TEXT,
    date TEXT NOT NULL
)`);

// Ruta principal para servir "index.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para guardar datos del formulario de contacto
app.post('/contact/add', (req, res) => {
    const { email, name, comment } = req.body;
    const ip = req.ip;
    const date = new Date().toISOString();

    if (!email || !name || !comment) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    db.run(`INSERT INTO contacts (email, name, comment, ip, date) VALUES (?, ?, ?, ?, ?)`, 
        [email, name, comment, ip, date], 
        (err) => {
            if (err) {
                return res.status(500).send('Error al guardar el contacto.');
            }
            res.send('¡Contacto guardado correctamente!');
        }
    );
});

// Ruta para mostrar los contactos registrados
app.get('/admin/contacts', (req, res) => {
    db.all(`SELECT * FROM contacts`, (err, rows) => {
        if (err) {
            return res.status(500).send('Error al obtener los contactos.');
        }
        res.json(rows);
    });
});

// Crear la tabla de pagos si no existe
db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    cardholder TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    date TEXT NOT NULL
)`);

// Ruta para procesar el formulario de pago
app.post('/payment/add', (req, res) => {
    const { email, cardholder, amount, currency } = req.body;

    if (!email || !cardholder || !amount || !currency) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const date = new Date().toISOString();

    db.run(`INSERT INTO payments (email, cardholder, amount, currency, date) VALUES (?, ?, ?, ?, ?)`, 
        [email, cardholder, amount, currency, date], 
        (err) => {
            if (err) {
                return res.status(500).send('Error al registrar el pago.');
            }
            res.send('¡Pago registrado correctamente!');
        }
    );
});

// Definir el puerto dinámicamente para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});