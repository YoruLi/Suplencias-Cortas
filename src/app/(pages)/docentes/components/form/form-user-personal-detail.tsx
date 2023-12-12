import React from "react";

import { Button } from "../../../../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";

type FormUserProps = {
    handleTeacherPersonalDetail: any;
    handleChange: any;
    values: FormTeacherPersonalDetailValues;
    prevStep: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const schema = z.object({
    email: z.string().email("Email invalido").min(1, "El email es obligatorio"),
    tel: z.string().min(10, "Numero de telefono invalido").max(10, "El telefono excede la cantidad de numeros"),
    dni: z.string().min(8, "Debe contener 10 digitos").max(10, "El cuil debe contener 10 digitos"),
    dir: z.string().min(1, "Direccion del docente es obligatoria"),
});

export type FormTeacherPersonalDetailValues = z.infer<typeof schema>;
export default function FormUserPersonalDetail({ values, prevStep, handleTeacherPersonalDetail, handleChange }: FormUserProps) {
    const {
        handleSubmit,
        register,
        formState: { errors, isLoading },
    } = useForm<FormTeacherPersonalDetailValues>({
        resolver: zodResolver(schema),
        defaultValues: values ?? {},
    });

    return (
        <form onSubmit={handleSubmit(handleTeacherPersonalDetail)} className="w-full flex flex-col  gap-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input placeholder="example@gmail.com" {...register("email")} onChange={handleChange("form2", "email")} className="remove-ring" />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message?.toString()}</p>}
            </div>
            <div>
                <Label htmlFor="tel">Telefono</Label>
                <Input id="tel" {...register("tel")} onChange={handleChange("form2", "tel")} className="remove-ring" />
                {errors.tel && <p className="text-red-500 text-xs italic">{errors.tel.message?.toString()}</p>}
            </div>
            <div>
                <Label htmlFor="dni">Dni</Label>
                <Input id="dni" {...register("dni")} onChange={handleChange("form2", "dni")} className="remove-ring" />
                {errors.dni && <p className="text-red-500 text-xs italic">{errors.dni.message?.toString()}</p>}
            </div>
            <div>
                <Label htmlFor="dir">Direccion</Label>
                <Input id="dir" {...register("dir")} onChange={handleChange("form2", "dir")} className="remove-ring" />
                {errors.dir && <p className="text-red-500 text-xs italic">{errors.dir.message?.toString()}</p>}
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
