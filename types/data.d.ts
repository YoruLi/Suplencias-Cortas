type UUID = `${string}-${string}-${string}-${string}-${string}`;

type Svg = {
    path: string;
    viewBox: string;
};

type FormTypes = {
    step: number;
    totalSteps: number;
    name: string;
    lastname: string;
    email: string;
    dni: string;
    tel: string;
    dir: string;
    score: string;
};

type FormTypesProps = Omit<FormTypes, "step" | "totalSteps">;
