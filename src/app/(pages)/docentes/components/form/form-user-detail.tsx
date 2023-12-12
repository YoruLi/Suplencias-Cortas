import React from "react";

import { Button } from "../../../../../components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";

type FormUserProps = {
    handleChange: (formName: string, fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajuste en la firma de handleChange
    values: FormTeacherDetailValues;
    handleTeacherDetail: any;
};

const schema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    lastname: z.string().min(1, "El apeliido es obligatorio"),
});

export type FormTeacherDetailValues = z.infer<typeof schema>;

export default function FormUserDetail({ values, handleChange, handleTeacherDetail }: FormUserProps) {
    const {
        handleSubmit,
        register,
        formState: { errors, isLoading },
    } = useForm<FormTeacherDetailValues>({
        resolver: zodResolver(schema),
        defaultValues: values ?? {},
    });

    return (
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit(handleTeacherDetail)}>
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" {...register("name")} value={values?.name} onChange={handleChange("form1", "name")} className="remove-ring" />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message?.toString()}</p>}
            </div>
            <div>
                <Label htmlFor="last-name">Apellido</Label>
                <Input id="last-name" {...register("lastname")} value={values?.lastname} onChange={handleChange("form1", "lastname")} className="remove-ring" />
                {errors.lastname && <p className="text-red-500 text-xs italic">{errors.lastname.message?.toString()}</p>}
            </div>

            <div className="flex gap-3 relative self-end place-self-end">
                <Button type="submit">Continuar</Button>
            </div>
        </form>
    );
}
