const sesionRepository = require('../repositories/sesionRepository');

const getAllSesiones = async (fecha, disciplina) => {
    return await sesionRepository.findAll(fecha, disciplina);
};

const createSesion = async (id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos) => {
    if (!id_disciplina || !id_entrenador || !hora_inicio || !hora_fin || !cupos) {
        throw { status: 400, message: 'Todos los campos son requeridos' };
    }

    if (cupos <= 0) {
        throw { status: 400, message: 'Los cupos deben ser mayores a 0' };
    }

    const sesion = await sesionRepository.create(id_disciplina, id_entrenador, hora_inicio, hora_fin, cupos);
    return sesion;
};

module.exports = { getAllSesiones, createSesion };
