const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta principal para servir "index.html"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Definir el puerto dinámicamente para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
