const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos el endpoint oficial: POST /api/v1/auth/login [1]
router.post('/login', authController.login);

module.exports = router;