const pool = require('../config/db');

/**
 * Obtiene todas las disciplinas del catálogo base [1].
 */
const findAll = async () => {
    try {
        // Usamos los nombres exactos del MER: ID_disciplina, Nombre, Descripcion [3]
        const query = 'SELECT id_disciplina, nombre, descripcion FROM disciplina ORDER BY id_disciplina';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error en disciplinaRepository.findAll:', error.message);
        throw error;
    }
};

module.exports = { findAll };