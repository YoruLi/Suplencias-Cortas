import React from "react";
import { Button } from "./ui/button";

import SubmitButton from "./submit-button";
import { createTeacher } from "../../actions/create-teacher";
import toast from "react-hot-toast";
import Icon from "./icon";
import svgs from "@/data/svgs";
import { redirect } from "next/navigation";

interface ConfirmProps {
    form1: {
        name: string;
        lastname: string;
    };
    form2: {
        email: string;
        dni: string;
        tel: string;
        dir: string;
    };
    form3: {
        score: string;
    };
}

export default function Confirm({ values, prevStep }: { values: ConfirmProps; prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    const { form1, form2, form3 } = values;

    if (!form1 || !form2 || !form3) {
        redirect("/docentes/agregar?step=0");
    }
    const contentValues = {
        ...form1,
        ...form2,
        ...form3,
    };

    const fields = [
        { label: "Nombre", value: contentValues.name },
        { label: "Apellido", value: contentValues.lastname },
        { label: "Email", value: contentValues.email },
        { label: "DNI", value: contentValues.dni },
        { label: "Teléfono", value: contentValues.tel },
        { label: "Puntuación", value: contentValues.score },
    ];

    return (
        <form
            action={() => {
                createTeacher(contentValues).then(res => {
                    toast(res.message, {
                        icon: <Icon {...svgs.userIcon} />,
                    });
                });
            }}
            className="grid gap-6 w-full "
        >
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
                <SubmitButton>Continuar</SubmitButton>
            </div>
        </form>
    );
}
