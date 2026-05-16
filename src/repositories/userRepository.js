// En un paso futuro configuraremos la conexión global (pool) a la DB
// Por ahora, definimos la estructura de la consulta SQL
const db = require('../config/db'); // Suponiendo que aquí estará tu conexión a Postgres

const findByEmail = async (email) => {
    try {
        // Consulta SQL directa a la tabla 'Usuario' definida en tu MER
        const query = 'SELECT id_user, password_hash, email, id_rol, activo FROM "Usuario" WHERE email = $1';
        const result = await db.query(query, [email]);

        // Retornamos el primer usuario encontrado o null si no existe
        return result.rows || null;
    } catch (error) {
        console.error('Error en userRepository.findByEmail:', error);
        throw new Error('Error al consultar la base de datos');
    }
};

module.exports = {
    findByEmail
};