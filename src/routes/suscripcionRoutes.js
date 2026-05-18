const express = require('express');
const router = express.Router();
const { getSuscripciones, createSuscripcion } = require('../controllers/suscripcionController');
const { verifyToken, authorize } = require('../middlewares/authMiddleware');

router.get('/', getSuscripciones);
router.post('/', verifyToken, authorize([1]), createSuscripcion);

module.exports = router;
