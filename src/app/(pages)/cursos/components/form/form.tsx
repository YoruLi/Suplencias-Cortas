"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateCourse } from "../../actions/update-course";
import { Label } from "@/components/ui/label";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import DeleteButton from "@/components/elements/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SelectItems } from "@/components/ui/select-items";
import { SelectItem } from "@/components/ui/select";
import { cursos, divisiones } from "@/utils/utils";
import ErrorMessage from "@/components/ui/error-message";

type schemaP = {
    curso: string;
    division: string;
};
export default function Form({ courseData }: { courseData: any }) {
    const schema = z.object({
        curso: z
            .string({
                required_error: "El año del curso es obligatorio",
            })
            .min(1, "El año del curso es obligatorio"),
        division: z
            .string({
                required_error: "La division del curso es obligatorio",
            })
            .min(1, "La division del curso es obligatorio"),
    });

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<schemaP>({
        resolver: zodResolver(schema),
    });
    const submit = async data => {
        await updateCourse(data, courseData.id);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className=" space-y-4 py-4">
            <div className="flex gap-3 w-full">
                <div className="w-full">
                    <SelectItems placeholder="Selecciona el año" setValueForm={setValue} title="Años" formData="curso">
                        {cursos.map(day => (
                            <SelectItem key={day} value={day} className="capitalize">
                                {day}
                            </SelectItem>
                        ))}
                    </SelectItems>
                    <ErrorMessage error={errors.curso} />
                </div>
                <div className="w-full">
                    <SelectItems title="Divisiones" formData="division" setValueForm={setValue} placeholder="Divisiones">
                        {divisiones.map(division => (
                            <>
                                <SelectItem value={division}>{division}</SelectItem>
                            </>
                        ))}
                    </SelectItems>
                    <ErrorMessage error={errors.division} />
                </div>
            </div>
            <div className="space-y-1">
                <Label htmlFor="ciclo">Ciclo Lectivo</Label>
                <Input
                    id="ciclo"
                    name="ciclo"
                    type="text"
                    className="pointer-events-none opacity-70"
                    value={new Date().getFullYear()}
                    defaultValue={new Date().getFullYear()}
                />
            </div>

            <div>
                <SheetFooter className="flex gap-2">
                    <DeleteButton id={courseData.id} entity="cursos">
                        Eliminar curso
                    </DeleteButton>

                    <Button type="submit">Guardar cambios</Button>
                </SheetFooter>
            </div>
        </form>
    );
}
