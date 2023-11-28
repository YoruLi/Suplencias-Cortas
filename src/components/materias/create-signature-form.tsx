"use client";
import React from "react";
import Title from "../ui/title";

import { SelectItems } from "../ui/select-items";
import { SelectItem } from "../ui/select";
import SubmitButton from "../submit-button";
import { createSignature } from "../../../actions/create-signature";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";

interface CreateSignatureFormValues {
    name: string;
    year: string;
    planId: string;
}

export default function CreateSignatureForm({ planes }: { planes: PlanDeEstudio[] }) {
    const signatureDays = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

    const schema = z.object({
        name: z
            .string({
                required_error: "El nombre de la materia es obligatorio",
            })
            .min(1, "El nombre de la materia es obligatorio"),
        year: z.string({
            required_error: "El año es obligatorio",
        }),
        planId: z.string({
            required_error: "Plan de estudio obligatorio",
        }),
    });
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateSignatureFormValues>({
        resolver: zodResolver(schema),
    });

    const handleCreateSignature = async (data: FieldValues) => {
        await createSignature(data);
    };
    return (
        <form
            onSubmit={handleSubmit(data => handleCreateSignature(data))}
            className="flex flex-col space-y-4 justify-center items-center h-full lg:min-h-[calc(100vh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto  w-full max-w-md"
        >
            <Title>Agregar matetia</Title>
            <div className="w-full">
                <Input register={register} name="name" placeholder="Nombre de materia..." />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message?.toString()}</p>}
            </div>
            <div className="flex gap-3 w-full">
                <div className="w-full">
                    <SelectItems placeholder="Selecciona el año" setValueForm={setValue} title="Años" formData="year">
                        {signatureDays.map(day => (
                            <SelectItem key={day} value={day} className="capitalize">
                                {day}
                            </SelectItem>
                        ))}
                    </SelectItems>
                    {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message?.toString()}</p>}
                </div>
                <div className="w-full">
                    <SelectItems placeholder="Selecciona el plan" setValueForm={setValue} title="Planes de estudio" formData="planId" {...register("planId")}>
                        {planes.map(plan => (
                            <SelectItem key={plan.id} value={plan.id} className="capitalize">
                                {plan.nombre}
                            </SelectItem>
                        ))}
                    </SelectItems>
                    {errors.planId && <p className="text-red-500 text-xs italic">{errors.planId.message?.toString()}</p>}
                </div>
            </div>

            <SubmitButton type="submit">Crear materia</SubmitButton>
        </form>
    );
}
