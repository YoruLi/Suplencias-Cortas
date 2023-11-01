import React from "react";
import Input from "./Input";

type FormUserProps = {
    handleChange: (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTypesProps;
    nextStep: (event: React.MouseEvent<HTMLButtonElement>, values: { [key: string]: string }) => void;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function FormUserPersonalDetail({ handleChange, values, nextStep, prevStep }: FormUserProps) {
    const { email, tel, dni, dir } = values;

    const validateValues = { email, tel, dni, dir };
    return (
        <form action="" className="flex flex-col gap-10 form mt-16 text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white ">
            <Input name="email" placeholder="email" defaultValue={email} onChange={handleChange("email")} />
            <Input name="tel" placeholder="telefono" defaultValue={tel} onChange={handleChange("tel")} />
            <Input name="dni" placeholder="DNI" defaultValue={dni} onChange={handleChange("dni")} />
            <Input name="dir" placeholder="direccion" defaultValue={dir} onChange={handleChange("dir")} />
            <div className="flex gap-3 relative self-end place-self-end">
                <button className=" bg-[#b1443c] hover:bg-[#7a3b37] px-3 py-1.5 rounded-md text-white" onClick={prevStep}>
                    Volver atras
                </button>
                <button className=" bg-main hover:bg-[rgb(60,72,123)] px-3 py-1.5 rounded-md text-white" onClick={evt => nextStep(evt, validateValues)}>
                    Continuar
                </button>
            </div>
        </form>
    );
}
