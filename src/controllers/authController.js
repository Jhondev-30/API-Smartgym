const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importamos el repositorio (lo crearás en el siguiente paso)
const userRepository = require('../repositories/userRepository');

const login = async (email, password) => {
    // 1. Buscar al usuario en la base de datos PostgreSQL por su email
    const user = await userRepository.findByEmail(email);

    // 2. Si el usuario no existe, lanzamos un error genérico por seguridad
    if (!user || !user.activo) {
        throw { status: 401, message: 'Credenciales inválidas' };
    }

    // 3. Comparar la contraseña ingresada con el hash guardado (Requerimiento No Funcional)
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
        throw { status: 401, message: 'Credenciales inválidas' };
    }

    // 4. Generar el Bearer Token (JWT)
    // Es OBLIGATORIO incluir el ID_rol para que la API sea stateless [2]
    const payload = {
        userId: user.id_user,
        roleId: user.id_rol // Esto permite aplicar el RBAC sin consultar la DB siempre [4, 5]
    };

    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return {
        token,
        user: {
            email: user.email,
            roleId: user.id_rol
        }
    };
};

module.exports = {
    login
};