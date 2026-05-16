// // En un paso futuro configuraremos la conexión global (pool) a la DB
// // Por ahora, definimos la estructura de la consulta SQL
// const db = require('../config/db'); // Suponiendo que aquí estará tu conexión a Postgres

// const findByEmail = async (email) => {
//     try {
//         // Consulta SQL directa a la tabla 'Usuario' definida en tu MER
//         const query = 'SELECT id_user, password_hash, email, id_rol, activo FROM "Usuario" WHERE email = $1';
//         const result = await db.query(query, [email]);

//         // Retornamos el primer usuario encontrado o null si no existe
//         return result.rows || null;
//     } catch (error) {
//         console.error('Error en userRepository.findByEmail:', error);
//         throw new Error('Error al consultar la base de datos');
//     }
// };

// module.exports = {
//     findByEmail
// };
// MIENTRAS JHON SE DIGNA EN PASARME LA BENDITA BASE DE DATOS 




/**
 * Datos de prueba (usuario simulado)
 * Uso: pruebas locales y desarrollo. NO usar en producción.
 * Reemplazar por la consulta real a la base de datos cuando esté disponible.
 */
const usuarioSimulado = {
    id_user: 1, // Identificador único (id_user) según la tabla Usuario
    email: "admin@smartgym.com", // Correo del usuario de prueba
    // Hash bcrypt para la contraseña 'admin123' (generado con bcryptjs, 10 salt rounds)
    // Si cambias la contraseña, regenera el hash con: bcrypt.hash('nueva', 10)
    password_hash: "$2b$10$fBXTziGAH49qGAqe/F9MeeLNQHTMx0e.QQqgQJblSsOJ8Z7ut9rNi",
    id_rol: 1, // id_rol = 1 => Admin (según el MER del proyecto)
    activo: true // Flag que indica si el usuario está activo (true = puede iniciar sesión)
};

const findByEmail = async (email) => {
    if (email === usuarioSimulado.email) {
        return usuarioSimulado;
    }
    return null;
};

module.exports = { findByEmail };