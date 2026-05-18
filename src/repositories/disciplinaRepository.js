const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'smartgym_db',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const findAll = async () => {
    try {
        const query = 'SELECT * FROM Disciplina ORDER BY Nombre';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error in disciplinaRepository.findAll:', error.message);
        throw new Error('Error al consultar las disciplinas');
    }
};

const create = async (nombre, descripcion) => {
    try {
        const query = 'INSERT INTO Disciplina (Nombre, Descripcion) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [nombre, descripcion]);
        return rows[0];
    } catch (error) {
        console.error('Error in disciplinaRepository.create:', error.message);
        throw new Error('Error al crear la disciplina');
    }
};

const findById = async (id) => {
    try {
        const query = 'SELECT * FROM Disciplina WHERE ID_disciplina = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error in disciplinaRepository.findById:', error.message);
        throw new Error('Error al consultar la disciplina');
    }
};

module.exports = { findAll, create, findById };
