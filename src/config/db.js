const { Pool } = require('pg');

// Configuración centralizada para cumplir con la persistencia relacional [1, 3]
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'smartgym_db',
    // Soporte para SSL si se despliega en entornos como Docker con configuraciones específicas [3, 4]
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Verificación de conexión para depuración en consola
pool.on('connect', () => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
});

module.exports = pool;