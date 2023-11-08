import React from "react";
import { Button } from "./ui/button";
import { createTeacher } from "./docentes/api/create-teacher";

export default function Confirm({ values, prevStep }: { values: FormTypesProps; prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { name, lastname, email, dni, tel, score } = values;

    const fields = [
        { label: "Nombre", value: name },
        { label: "Apellido", value: lastname },
        { label: "Email", value: email },
        { label: "DNI", value: dni },
        { label: "Teléfono", value: tel },
        { label: "Puntuación", value: score },
    ];

    return (
        <div className="grid gap-6 w-full ">
            <ul className="text-gray-500 font-normal flex flex-col font-sans [&>li>label]:text-black">
                {fields.map(item => (
                    <li key={item.label} className="flex justify-between ">
                        <label>{item.label}: </label>
                        {item.value}
                    </li>
                ))}
            </ul>
            <div className="flex gap-3 relative self-end place-self-end">
                <Button className=" bg-[#b1443c] hover:bg-[#a25650]" onClick={prevStep}>
                    Volver atras
                </Button>
                <Button
                    onClick={event => {
                        event.preventDefault();
                        createTeacher(values);
                    }}
                >
                    Continuar
                </Button>
            </div>
        </div>
    );
}
