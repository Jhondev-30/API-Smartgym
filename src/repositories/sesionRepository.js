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

const findAll = async (fecha, disciplina) => {
    try {
        let query = `SELECT s.*, d.Nombre as Disciplina_Nombre, e.Nombre as Entrenador_Nombre, e.Apellido as Entrenador_Apellido
                    FROM Sesiones s
                    JOIN Disciplina d ON s.ID_disciplina = d.ID_disciplina
                    JOIN Entrenadores e ON s.ID_entrenador = e.ID_entrenador`;
        const params = [];

        if (fecha) {
            query += ` WHERE DATE(s.Hora_inicio::date) = $${params.length + 1}`;
            params.push(fecha);
        }

        if (disciplina) {
            query += (fecha ? ' AND' : ' WHERE') + ` d.Nombre ILIKE $${params.length + 1}`;
            params.push(`%${disciplina}%`);
        }

        query += ' ORDER BY s.Hora_inicio';
        const { rows } = await pool.query(query, params);
        return rows;
    } catch (error) {
        console.error('Error in sesionRepository.findAll:', error.message);
        throw new Error('Error al consultar las sesiones');
    }
};

const create = async (id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos) => {
    try {
        const query = `INSERT INTO Sesiones (ID_disciplina, ID_entrenador, Hora_inicio, Hora_fin, Cupos)
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const { rows } = await pool.query(query, [id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos]);
        return rows[0];
    } catch (error) {
        console.error('Error in sesionRepository.create:', error.message);
        throw new Error('Error al crear la sesión');
    }
};

const findById = async (id) => {
    try {
        const query = 'SELECT * FROM Sesiones WHERE ID_sesion = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error in sesionRepository.findById:', error.message);
        throw new Error('Error al consultar la sesión');
    }
};

module.exports = { findAll, create, findById };
