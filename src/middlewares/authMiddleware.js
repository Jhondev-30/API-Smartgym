const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer <TOKEN>

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized', mensaje: 'Token inválido o expirado' });
    }
};

const authorize = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized', mensaje: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (rolesPermitidos.length && !rolesPermitidos.includes(req.user.roleId)) {
                return res.status(403).json({ error: 'Forbidden', mensaje: 'No tienes permisos para esta acción' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized', mensaje: 'Token inválido o expirado' });
        }
    };
};

module.exports = { verifyToken, authorize };

