import React from "react";
import { Button } from "../../../../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import ErrorMessage from "../../../../../components/ui/error-message";

import { CalendarDemo } from "../../../../../components/elements/calendar";
import { Calendar } from "../../../../../components/ui/calendar";
import { DatePickerDemo } from "../../../../../components/ui/date-picker";

type FormUserProps = {
    values: FormTeacherMoreDetail;
    handleTeacherMoreDetail: any;
    handleChange: any;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const schema = z.object({
    nac: z.date({
        required_error: "La fecha de nacimiento es obligatoria",
    }),
    antiguedadEsc: z.date({
        required_error: "La antiguedad en la escuela es obligatoria",
    }),
    antiguedadDoc: z.date({
        required_error: "La antiguedad en la docencia es obligatoria",
    }),
    localidad: z
        .string({
            required_error: "No te olvides la localidad 😥",
        })
        .min(1, "No te olvides la localidad 😥"),
});
export type FormTeacherMoreDetail = z.infer<typeof schema>;
export default function FormUserMoreDetail({ values, prevStep, handleChange, handleTeacherMoreDetail }: FormUserProps) {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isLoading },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues:
            {
                nac: values?.nac,
                antiguedadEsc: values?.antiguedadEsc,
                antiguedadDoc: values?.antiguedadDoc,
                localidad: values?.localidad,
            } ?? {},
    });
    return (
        <form onSubmit={handleSubmit(handleTeacherMoreDetail)} className="w-full flex flex-col gap-4 h-full space-y-10">
            <div className="mx-auto space-y-10">
                <div className="flex gap-4">
                    <div>
                        <Label htmlFor="antiguedadEsc">Antiguedad Escuela</Label>
                        <div>
                            <DatePickerDemo setValue={setValue} {...register("antiguedadEsc")} name="antiguedadEsc" />
                        </div>
                        <ErrorMessage error={errors.antiguedadEsc} />
                    </div>
                    <div>
                        <Label htmlFor="antiguedadDoc">Antiguedad Docencia</Label>
                        <div>
                            <DatePickerDemo {...register("antiguedadDoc")} setValue={setValue} name="antiguedadDoc" />
                        </div>
                        <ErrorMessage error={errors.antiguedadDoc} />
                    </div>
                </div>
                <div className="">
                    <Label htmlFor="nac">Nacimiento</Label>
                    <div>
                        <DatePickerDemo {...register("nac")} setValue={setValue} name="nac" />
                    </div>
                    <ErrorMessage error={errors.nac} />
                </div>
                <div className="">
                    <Label htmlFor="localidad">Localidad</Label>
                    <div>
                        <Input type="text" className="remove-ring" {...register("localidad")} name="localidad" />
                    </div>
                    <ErrorMessage error={errors.localidad} />
                </div>
            </div>

            <div className="flex gap-3 relative self-end place-self-end">
                <Button className=" bg-[#b1443c] hover:bg-[#a25650]" onClick={prevStep}>
                    Volver atras
                </Button>
                <Button type="submit">Continuar</Button>
            </div>
        </form>
    );
}
