const disciplinaRepository = require('../repositories/disciplinaRepository');

const getDisciplinas = async (req, res) => {
    try {
        const disciplinas = await disciplinaRepository.findAll();
        // Respondemos con 200 OK según el estándar [5]
        res.status(200).json(disciplinas);
    } catch (error) {
        res.status(500).json({ 
            error: "Internal Server Error", 
            mensaje: "Error al obtener el catálogo de disciplinas",
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = { getDisciplinas };