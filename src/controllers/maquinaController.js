const { Pool } = require('pg');

console.log('DB PARAMS:', {
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: process.env.PGSSL
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'smartgym_db',
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
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