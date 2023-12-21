type UUID = `${string}-${string}-${string}-${string}-${string}`;

type Svg = {
    path: string;
    viewBox: string;
};

type FormTypes = {
    name: string;
    lastname: string;
    email: string;
    dni: string;
    tel: string;
    dir: string;
    score: string;
};

type FormTypesProps = Omit<FormTypes, "step" | "totalSteps">;

interface FormTeacherPositionValues {
    docentes: string;
    cursoId: string;
    codigoMateria: string;
    hours: any;
    days: any;
    state: string;
}
