const express = require('express');
const router = express.Router();
const { getDisciplinas, createDisciplina } = require('../controllers/disciplinaController');
const { verifyToken, authorize } = require('../middlewares/authMiddleware');

router.get('/', getDisciplinas);
router.post('/', verifyToken, authorize([1]), createDisciplina);

module.exports = router;
