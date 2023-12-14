"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

import { MateriaList } from "@/components/ui/combo-box";
import { CalendarDemo } from "@/components/elements/calendar";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTeachingPosition } from "../../actions/create-teaching-position";

import { AutoCompleteField } from "@/components/elements/auto-complete-field";

export default function CreateForm({ signature, courses }: { signature: Materia[]; courses: Curso[] }) {
    const schema = z.object({
        docentes: z
            .string({
                required_error: "Por favor, selecciona un docente...",
            })
            .min(1, "El docente es obligatorio"),
        curso: z.string({
            required_error: "Por favor, selecciona un curso",
        }),
        materia: z.string({
            required_error: "Por favor, selecciona una materia",
        }),
        hours: z.record(
            z.array(z.string()).refine(arr => arr.length > 0, {
                message: "Selecciona un horario",
            }),
            {
                required_error: "Selecciona el dia",
            }
        ),
    });

    type FormCreateTeacherPosition = z.infer<typeof schema>;
    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormCreateTeacherPosition>({
        resolver: zodResolver(schema),
    });

    const handleCreateTeacherPosition = async (data: FieldValues) => {
        const validatedData = schema.safeParse(data);

        if (!validatedData.success) {
            console.log(validatedData.error);
            return;
        }
        console.log(validatedData.data);
        await createTeachingPosition(validatedData.data);
    };

    return (
        <form
            onSubmit={handleSubmit(data => handleCreateTeacherPosition(data))}
            className="max-w-md flex flex-col items-center justify-between gap-6 w-full  [&>div>div>span]:bg-white relative ´[&>div>div>input]:relative [&>div>div>input]:text-black "
        >
            <div className="w-full">
                <AutoCompleteField name="docentes" placeholder="Buscar docente..." setValueForm={setValue} control={control} />

                {errors.docentes && <p className="text-red-500 text-xs italic">{errors.docentes.message?.toString()}</p>}
            </div>
            <div className="flex w-full  mx-auto  justify-evenly">
                <div className="text-center">
                    <MateriaList
                        setValueForm={setValue}
                        register={register}
                        placeholder="Buscar materia..."
                        dataInfo={signature.map((d: Materia) => {
                            return {
                                id: d.codigoMateria,
                                value: d.nombre,
                                label: d.nombre,
                            };
                        })}
                        label="Selecciona materia "
                        name="materia"
                    />
                    {errors.materia && <p className="text-red-500 text-xs italic ">{errors.materia.message?.toString()}</p>}
                </div>
                <div className="text-center">
                    <MateriaList
                        setValueForm={setValue}
                        register={register}
                        placeholder="Buscar curso..."
                        dataInfo={courses.map((d: Curso) => {
                            return {
                                id: d.id,
                                value: d.nombre,
                                label: d.nombre,
                            };
                        })}
                        label="Selecciona curso "
                        name="curso"
                    />
                    {errors.curso && <p className="text-red-500 text-xs italic">{errors.curso.message?.toString()}</p>}
                </div>
            </div>

            <div className="w-full  ">
                <CalendarDemo register={register} errors={errors} setValueForm={setValue} />
            </div>
            <Button type="submit" className="w-full mx-auto">
                {isSubmitting && !isSubmitSuccessful ? "Cargando..." : "Confirmar"}
            </Button>
        </form>
    );
}
