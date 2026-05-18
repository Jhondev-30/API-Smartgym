// Importamos el pool centralizado para garantizar la consistencia de los datos [1]
const pool = require('../config/db');

const getMaquinas = async (req, res) => {
    try {
        // Consulta SQL usando los nombres exactos definidos en el MER [7, 8]
        const result = await pool.query('SELECT * FROM Maquinas ORDER BY ID_maquina');
        
        console.log('Consulta exitosa, máquinas encontradas:', result.rows.length);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error en maquinaController.getMaquinas:', error);
        // Respuesta estandarizada según el contrato de la API [9, 10]
        res.status(500).json({ 
            error: 'Internal Server Error', 
            mensaje: 'Error al obtener el listado de máquinas',
            detalle: error.message 
        });
    }
};

module.exports = { getMaquinas };