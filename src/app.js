// 1. Cargar variables de entorno del archivo .env
require('dotenv').config();

// 2. Importar Express
const express = require('express');

const app = express();

// Middleware para que el servidor pueda leer JSON en el cuerpo (body) de las peticiones
app.use(express.json());

// Definir el puerto: usa el del .env o el 3000 por defecto si no existe
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor SmartGym corriendo en el puerto ${PORT}`);
});

// Exportar la app (útil para pruebas futuras)
module.exports = app;