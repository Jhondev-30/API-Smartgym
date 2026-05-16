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

// 1. Importar las rutas (asegúrate de que la ruta al archivo sea correcta)
const authRoutes = require('./routes/authRoutes');

// ... después de app.use(express.json()) ...

// 2. Conectar el prefijo con el archivo de rutas
// Esto hace que todas las rutas dentro de authRoutes empiecen con /api/v1/auth
app.use('/api/v1/auth', authRoutes); 

// CON ESTO PROBAMOS QUE TODO FUNCIONA BIEN, INCLUYENDO LA ESTRUCTURA DE RESPUESTA EXITOSA Y DE ERROR, ASÍ COMO LA LÓGICA DE NEGOCIO EN EL SERVICIO Y LA SIMULACIÓN DE LA BASE DE DATOS EN EL REPOSITORIO.
//Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method Post -ContentType "application/json" -Body '{"email": "admin@smartgym.com", "password": "admin123"}'
// CON ESTO PROBAMOS QUE TODO FUNCIONA BIEN, INCLUYENDO LA ESTRUCTURA DE RESPUESTA EXITOSA Y DE ERROR, ASÍ COMO LA LÓGICA DE NEGOCIO EN EL SERVICIO Y LA SIMULACIÓN DE LA BASE DE DATOS EN EL REPOSITORIO.