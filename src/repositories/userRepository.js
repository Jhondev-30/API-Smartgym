const { Pool } = require('pg');

// Configuración del Pool de conexiones
// Se priorizan las variables de entorno para cumplir con el despliegue en Docker [1, 4]
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'smartgym_db',
    // SSL para entornos de producción (opcional)
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
});

/**
 * Busca un usuario por su email para el Sistema de Identidad y Seguridad [5].
 * @param {string} email - Correo proporcionado en el login.
 * @returns {Object|null} - Retorna el objeto del usuario o null si no existe.
 */
const findByEmail = async (email) => {
    try {
        // 1. Consulta SQL usando los nombres exactos del MER: id_user, password_hash, id_rol, activo [3, 6].
        // 2. Se mantienen las comillas en "Usuario" por la U mayúscula definida en el diseño [2, 3].
        const query = 'SELECT id_user, password_hash, email, id_rol, activo FROM usuario WHERE email = $1';
        
        // 3. SE ARREGLA LO MALO: Se pasa [email] como arreglo para que el driver asigne el valor a $1.
        // Esto garantiza la SANITIZACIÓN contra inyección SQL requerida por el profesor [1].
        const { rows } = await pool.query(query, [email]);

        // 4. Retornamos solo la primera fila (el objeto usuario) para facilitar la lógica del controlador.
        return rows || null;
    } catch (error) {
        // Registro del error en consola para depuración técnica.
        console.error('Error crítico en userRepository.findByEmail:', error.message);
        
        // Lanzamos un error genérico para que el controlador lo maneje con un código 500 [7].
        throw new Error('Error al consultar la base de datos');
    }
};

module.exports = { findByEmail };