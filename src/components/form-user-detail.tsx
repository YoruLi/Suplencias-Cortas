import React from "react";
import Input from "./Input";

type FormUserProps = {
    handleChange: (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTypesProps;
    nextStep: (event: React.MouseEvent<HTMLButtonElement>, values: { [key: string]: string }) => void;
};

export default function FormUserDetail({ handleChange, values, nextStep }: FormUserProps) {
    const { name, lastname } = values;

    return (
        <form action="" className="flex flex-col gap-10 form mt-16 text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white ">
            <Input onChange={handleChange("name")} defaultValue={name} name="name" placeholder="nombre" />
            <Input onChange={handleChange("lastname")} defaultValue={lastname} name="lastname" placeholder="apellido" />

            <div className="flex gap-3 relative self-end place-self-end">
                <button className=" bg-main hover:bg-[rgb(60,72,123)] px-3 py-1.5 rounded-md text-white" onClick={evt => nextStep(evt, { name, lastname })}>
                    Continuar
                </button>
            </div>
        </form>
    );
}
