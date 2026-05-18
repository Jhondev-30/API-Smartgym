const express = require('express');
const router = express.Router();
const evaluacionRoutes = require('./evaluacionRoutes');
const membresiRoutes = require('./membresiRoutes');

router.use('/:id_cliente/evaluaciones', evaluacionRoutes);
router.use('/:id_cliente/membresias', membresiRoutes);

module.exports = router;
