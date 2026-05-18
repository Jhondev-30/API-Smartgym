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

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// 1. Opciones de configuración para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartGym API',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema SmartGym',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  // Ruta hacia donde estarán tus endpoints para que Swagger los lea (ej: en la carpeta routes)
  apis: ['./src/routes/*.js', './src/app.js'], 
};

// 2. Inicializar swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 3. Crear la ruta para la interfaz gráfica de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ... El resto de tus rutas y tu app.listen() que ya tienes configurado