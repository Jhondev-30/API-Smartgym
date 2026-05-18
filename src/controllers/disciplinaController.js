const disciplinaService = require('../services/disciplinaService');

const getDisciplinas = async (req, res) => {
    try {
        const disciplinas = await disciplinaService.getAllDisciplinas();
        return res.status(200).json(disciplinas);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

const createDisciplina = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const disciplina = await disciplinaService.createDisciplina(nombre, descripcion);
        return res.status(201).json(disciplina);
    } catch (error) {
        return res.status(error.status || 500).json({
            error: error.status === 400 ? 'Bad Request' : 'Internal Server Error',
            mensaje: error.message || 'Error al procesar la solicitud',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = { getDisciplinas, createDisciplina };
