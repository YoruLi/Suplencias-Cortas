type User = {
    id: string;
    username: UUID;
    password: string;
    createdAt: string | Date;
};

type Teacher = {
    id: string;
    nombreCompleto: string;
    email: string;
    tel: string;
    dir: string;
    dni: string;
    score: string;
};

type Cargo = {
    id: string;
    docenteId: string;
    codigoMateria: string;
    cursoId: string;
    codigoCupof: string;
    turno: string;
    horario: string;
};

type Curso = {
    id: string;
    nombre: string;
    modalidadId: string;
    cicloLectivo: string;
};

type Materia = {
    codigoMateria: string;
    nombre: string;
    año: string;
    planDeEstudioId: string;
};
