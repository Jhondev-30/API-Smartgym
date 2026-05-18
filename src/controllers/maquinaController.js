const { Pool } = require('pg');

console.log('DB PARAMS:', {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'smartgym_db',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const getMaquinas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM maquinas ORDER BY id_maquina');
        console.log('Consulta exitosa, filas:', result.rows.length);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error en maquinaController.getMaquinas:', error);
        res.status(500).json({ error: 'Error al obtener máquinas', detalle: error.message });
    }
};

module.exports = { getMaquinas };