const suscripcionService = require('../services/suscripcionService');

const getSuscripciones = async (req, res) => {
    try {
        const suscripciones = await suscripcionService.getAllSuscripciones();
        return res.status(200).json(suscripciones);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

const createSuscripcion = async (req, res) => {
    try {
        const { nombre, costo, duracion } = req.body;
        const suscripcion = await suscripcionService.createSuscripcion(nombre, costo, duracion);
        return res.status(201).json(suscripcion);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = { getSuscripciones, createSuscripcion };
