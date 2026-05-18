const sesionService = require('../services/sesionService');

const getSesiones = async (req, res) => {
    try {
        const { fecha, disciplina } = req.query;
        const sesiones = await sesionService.getAllSesiones(fecha, disciplina);
        return res.status(200).json(sesiones);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

const createSesion = async (req, res) => {
    try {
        const { id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos } = req.body;
        const sesion = await sesionService.createSesion(id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos);
        return res.status(201).json(sesion);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = { getSesiones, createSesion };
