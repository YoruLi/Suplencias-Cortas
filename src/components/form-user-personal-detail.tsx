import React from "react";
import Input from "./Input";
import { Button } from "./ui/button";

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
        <>
            <Input name="email" placeholder="email" defaultValue={email} onChange={handleChange("email")} />
            <Input name="tel" placeholder="telefono" defaultValue={tel} onChange={handleChange("tel")} />
            <Input name="dni" placeholder="DNI" defaultValue={dni} onChange={handleChange("dni")} />
            <Input name="dir" placeholder="direccion" defaultValue={dir} onChange={handleChange("dir")} />
            <div className="flex gap-3 relative self-end place-self-end">
                <Button className=" bg-[#b1443c] hover:bg-[#a25650]" onClick={prevStep}>
                    Volver atras
                </Button>
                <Button onClick={evt => nextStep(evt, validateValues)}>Continuar</Button>
            </div>
        </>
    );
}
