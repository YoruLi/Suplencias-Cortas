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
