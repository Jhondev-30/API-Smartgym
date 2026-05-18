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
        const query = 'SELECT * FROM suscripcion ORDER BY Nombre';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error in suscripcionRepository.findAll:', error.message);
        throw new Error('Error al consultar los planes de suscripción');
    }
};

const create = async (nombre, costo, duracion) => {
    try {
        const query = 'INSERT INTO suscripcion (Nombre, Costo, Duracion) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await pool.query(query, [nombre, costo, duracion]);
        return rows[0];
    } catch (error) {
        console.error('Error in suscripcionRepository.create:', error.message);
        throw new Error('Error al crear el plan de suscripción');
    }
};

const findById = async (id) => {
    try {
        const query = 'SELECT * FROM suscripcion WHERE ID_suscripcion = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error in suscripcionRepository.findById:', error.message);
        throw new Error('Error al consultar el plan de suscripción');
    }
};

module.exports = { findAll, create, findById };
