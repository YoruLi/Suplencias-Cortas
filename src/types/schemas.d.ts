type User = {
    id: string;
    username: UUID;
    password: string;
    createdAt: string | Date;
};

type Teacher = {
    idDocentes: string;
    nombreCompleto: string;
    email: string;
    tel: string;
    dir: string;
    dni: string;
    score: string;
};
type Curso = {
    id: string;
    nombre: string;
    modalidadId: string;
    cicloLectivo: string;
};
type Cargo = {
    idCargos: string;
    docenteId: string;
    codigoMateria: string;
    cursoId: string;
    codigoCupof: string;
    turno: string;
    horario: string;
};

type PlanDeEstudio = {
    id: string;
    nombre: string;
    descripcion: string;
    resolucion: string;
};

interface CargoResponse extends Cargo {
    nombreMateria: string;
    nombreDocente: string;
    nombreCurso: string;
}

type Materia = {
    codigoMateria: string;
    nombre: string;
    año: string;
    planDeEstudioId: string;
};

type DataPerMonth = {
    month: number;
    total: number;
};

type Bitacora = {
    id?: string;
    descripcion: string;
    resolucion: string;
};

type TotalPages = {
    total: string;
};
