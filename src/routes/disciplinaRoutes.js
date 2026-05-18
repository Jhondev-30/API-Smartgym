const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');
const { verifyToken, authorize } = require('../middlewares/authMiddleware');

// GET /api/v1/disciplinas
// Protegido: Solo Admin (Rol 1) puede consultar [1]
router.get('/', verifyToken, authorize([1]), disciplinaController.getDisciplinas);

module.exports = router;