import Input from "@/components/Input";
import React from "react";
import { Button } from "./ui/button";

type FormUserProps = {
    handleChange: (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTypesProps;
    nextStep: (event: React.MouseEvent<HTMLButtonElement>, values: { [key: string]: string }) => void;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FormUserMoreDetail({ handleChange, values, nextStep, prevStep }: FormUserProps) {
    const { score } = values;
    return (
        <>
            <Input defaultValue={score} onChange={handleChange("score")} name="score" placeholder="puntaje" />

            <div className="flex gap-3 relative self-end place-self-end">
                <Button className=" bg-[#b1443c] hover:bg-[#a25650]" onClick={prevStep}>
                    Volver atras
                </Button>
                <Button onClick={evt => nextStep(evt, { score })}>Continuar</Button>
            </div>
        </>
    );
}
