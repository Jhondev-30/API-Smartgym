// 1. Cargar variables de entorno del archivo .env
require('dotenv').config();

// 2. Importar Express y el Enrutador Central
const express = require('express');
// CORRECCIÓN DE RUTA: Como app.js ya está en /src, buscamos directamente en /routes
const mainRouter = require('./routes/index'); 

const app = express();

// Middleware para leer JSON en el cuerpo de las peticiones
app.use(express.json());

// 3. CONEXIÓN GLOBAL: Todas las rutas bajo el prefijo oficial /api/v1 [2-4]
// Esto permite que el login sea /api/v1/auth/login y máquinas sea /api/v1/maquinas
app.use('/api/v1', mainRouter);

// Definir el puerto: usa el del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor SmartGym corriendo en el puerto ${PORT}`);
});

// Exportar la app para pruebas futuras [5]
module.exports = app;