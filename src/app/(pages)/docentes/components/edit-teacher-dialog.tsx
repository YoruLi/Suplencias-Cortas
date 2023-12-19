import Input from "@/components/elements/Input";
import SubmitButton from "@/components/elements/submit-button";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { MenuItem } from "@mui/material";
import React from "react";
import { update } from "../api/update";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/components/ui/error-message";

type TeacherEditSchema = {
    email: string;
    tel: string;
    dni: string;
    dir: string;
};

const emptyStringToUndefined = (schema: z.ZodString) => z.literal("").transform(() => undefined);

const schema = z.object({
    fullname: z.string(),
    email: z.string().email().optional().or(z.literal("")),
    tel: z.string().min(10, "Numero de telefono invalido").max(10, "El telefono excede la cantidad de numeros").optional().or(z.literal("")),
    dni: z.string().min(8, "Debe contener 8 digitos").max(10, "El cuil debe contener 10 digitos").optional().or(z.literal("")),
    dir: z.string().min(1, "Direccion del docente es obligatoria").optional().or(z.literal("")),
    localidad: z.string(),
});

export default function EditTeacherDialog({ teacher }: { teacher: Teacher }) {
    const updateTeacher = async data => {
        const { error } = await update(data, teacher.idDocentes);
        console.log(error);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Se ha modificado con éxito!!");
        }
    };

    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherEditSchema>({
        resolver: zodResolver(schema),
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem className="!text-sm !px-2 text-start">Editar docente</MenuItem>
            </DialogTrigger>
            <DialogContent className="h-auto">
                <DialogHeader>
                    <DialogTitle>Editar Docente</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(updateTeacher)} className="space-y-4">
                    <Input placeholder="nombre" name="fullname" register={register} />
                    <div>
                        <Input placeholder="correo electronico" name="email" register={register} />
                        <ErrorMessage error={errors.email} />
                    </div>
                    <div>
                        <Input placeholder="DNI" name="dni" register={register} />
                        <ErrorMessage error={errors.dni} />
                    </div>
                    <div>
                        <Input placeholder="telefono" name="tel" register={register} />
                        <ErrorMessage error={errors.tel} />
                    </div>
                    <Input placeholder="dirrecion" name="dir" register={register} />
                    <Input placeholder="localidad" name="localidad" register={register} />
                    <DialogFooter>
                        <SubmitButton type="submit" className="mt-4">
                            Guardar cambios
                        </SubmitButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
