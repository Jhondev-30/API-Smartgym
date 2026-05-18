require('dotenv').config(); // Esto debe ser la línea 1
const express = require('express');
const mainRouter = require('./routes/index'); // Asegúrate de que esta ruta sea correcta [11]

const app = express();
app.use(express.json());

// Prefijo oficial de la API v1 [11, 12]
app.use('/api/v1', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor SmartGym corriendo en el puerto ${PORT}`);
});