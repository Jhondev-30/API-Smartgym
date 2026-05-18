const express = require('express');
const router = express.Router();
const { getSesiones, createSesion } = require('../controllers/sesionController');
const { verifyToken, authorize } = require('../middlewares/authMiddleware');

router.get('/', getSesiones);
router.post('/', verifyToken, authorize([1]), createSesion);

module.exports = router;
