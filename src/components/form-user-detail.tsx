import React from "react";
import Input from "./Input";
import { Button } from "./ui/button";

type FormUserProps = {
    handleChange: (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTypesProps;
    nextStep: (event: React.MouseEvent<HTMLButtonElement>, values: { [key: string]: string }) => void;
};

export default function FormUserDetail({ handleChange, values, nextStep }: FormUserProps) {
    const { name, lastname } = values;

    return (
        <>
            <Input onChange={handleChange("name")} defaultValue={name} name="name" placeholder="nombre" />
            <Input onChange={handleChange("lastname")} defaultValue={lastname} name="lastname" placeholder="apellido" />

            <div className="flex gap-3 relative self-end place-self-end">
                <Button onClick={evt => nextStep(evt, { name, lastname })}>Continuar</Button>
            </div>
        </>
    );
}
