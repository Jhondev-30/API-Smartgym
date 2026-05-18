const disciplinaRepository = require('../repositories/disciplinaRepository');

const getAllDisciplinas = async () => {
    return await disciplinaRepository.findAll();
};

const createDisciplina = async (nombre, descripcion) => {
    if (!nombre || nombre.trim() === '') {
        throw { status: 400, message: 'El nombre de la disciplina es requerido' };
    }

    const disciplina = await disciplinaRepository.create(nombre, descripcion || null);
    return disciplina;
};

module.exports = { getAllDisciplinas, createDisciplina };
