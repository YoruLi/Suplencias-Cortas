import Input from "@/components/Input";
import React from "react";

type FormUserProps = {
    handleChange: (input: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTypesProps;
    nextStep: (event: React.MouseEvent<HTMLButtonElement>, values: { [key: string]: string }) => void;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FormUserMoreDetail({ handleChange, values, nextStep, prevStep }: FormUserProps) {
    const { score } = values;
    return (
        <form action="" className="flex flex-col gap-10 form mt-16 text-main [&>div>input]:text-black  [&>*]:border-main [&>div>span]:bg-white ">
            <Input defaultValue={score} onChange={handleChange("score")} name="score" placeholder="puntaje" />

            <div className="flex gap-3 relative self-end place-self-end">
                <button className=" bg-[#b1443c] hover:bg-[#7a3b37] px-3 py-1.5 rounded-md text-white" onClick={prevStep}>
                    Volver atras
                </button>
                <button className=" bg-main hover:bg-[rgb(60,72,123)] px-3 py-1.5 rounded-md text-white" onClick={evt => nextStep(evt, { score })}>
                    Continuar
                </button>
            </div>
        </form>
    );
}
