const express = require('express');
const router = express.Router();

// Importar los archivos de rutas de cada módulo
const authRoutes = require('./authRoutes');      
const maquinaRoutes = require('./maquinaRoutes'); 
const disciplinaRoutes = require('./disciplinaRoutes'); // Nueva importación

// Conectar los módulos a sus prefijos correspondientes
// Las rutas de auth ahora empezarán con /api/v1/auth [3]
router.use('/auth', authRoutes);       
// Las rutas de máquinas ahora empezarán con /api/v1/maquinas [3]
router.use('/maquinas', maquinaRoutes); 
router.use('/disciplinas', disciplinaRoutes); // Nuevo prefijo


module.exports = router;