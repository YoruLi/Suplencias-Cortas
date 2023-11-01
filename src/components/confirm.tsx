import React from "react";

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

    const createTeacher = async () => {
        const validatedValues = {};
        const res = await fetch(`/api/docentes`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const json = await res.json();
    };
    return (
        <div className="grid place-content-center justify-items-center gap-6 w-full my-8">
            <ul className="text-gray-500 font-normal font-sans [&>li>label]:text-black">
                {fields.map(item => (
                    <li key={item.label}>
                        <label>{item.label}: </label>
                        {item.value}
                    </li>
                ))}
            </ul>
            <div className="flex gap-3 relative self-end place-self-end">
                <button className=" bg-[#b1443c] hover:bg-[#7a3b37] px-3 py-1.5 rounded-md text-white" onClick={prevStep}>
                    Volver atras
                </button>
                <button className=" bg-main hover:bg-[rgb(60,72,123)] px-3 py-1.5 rounded-md text-white" onClick={createTeacher}>
                    Continuar
                </button>
            </div>
        </div>
    );
}
