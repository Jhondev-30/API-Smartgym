const express = require('express');
const router = express.Router();
const { getMaquinas } = require('../controllers/maquinaController');
const { verifyToken, authorize } = require('../middlewares/authMiddleware');

// RUTA PROTEGIDA: Solo entra quien tenga Token Y sea Admin (Rol 1)
// Según tu MER y Seeders, el ID_rol 1 es Administrador [6, 8]
router.get('/', verifyToken, authorize([1]), getMaquinas);

module.exports = router;