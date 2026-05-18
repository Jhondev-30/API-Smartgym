const suscripcionRepository = require('../repositories/suscripcionRepository');

const getAllSuscripciones = async () => {
    return await suscripcionRepository.findAll();
};

const createSuscripcion = async (nombre, costo, duracion) => {
    if (!nombre || nombre.trim() === '') {
        throw { status: 400, message: 'El nombre del plan es requerido' };
    }
    if (!costo || costo <= 0) {
        throw { status: 400, message: 'El costo debe ser mayor a 0' };
    }
    if (!duracion || duracion <= 0) {
        throw { status: 400, message: 'La duración debe ser mayor a 0 días' };
    }

    const suscripcion = await suscripcionRepository.create(nombre, costo, duracion);
    return suscripcion;
};

module.exports = { getAllSuscripciones, createSuscripcion };
