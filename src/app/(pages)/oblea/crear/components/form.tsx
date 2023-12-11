"use client";
import { AutoCompleteField } from "@/components/auto-complete-field";
import SubmitButton from "@/components/submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MateriaDemo } from "./materia-demo";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/ui/error-message";

import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/get-error-message";
import { fetcher } from "@/utils/fetch-url";

type FormSchema = {
    docentes: string;
    signature: string;
    score: string;
};
export default function ObleaForm({ signature }: { signature: any }) {
    const schema = z.object({
        docentes: z
            .string({
                required_error: "El docente es obligatorio",
            })
            .min(1, "El docente es obligatorio"),

        signature: z.record(
            z.array(z.string()).refine(arr => arr.length > 0, {
                message: "Selecciona la materia/s",
            }),
            {
                required_error: "La materia es obligatoria",
            }
        ),
        score: z
            .string({
                required_error: "Por favor, no te olvides del puntaje del docente",
            })
            .min(1, "No te olvides el score del docente"),
    });

    const {
        handleSubmit,
        control,
        register,
        setValue,

        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormSchema>({
        resolver: zodResolver(schema),
    });

    const create = async data => {
        try {
            const parseData = {
                docenteId: data.docentes,
                materia: data.signature,
                score: parseFloat(data.score).toFixed(2),
            };

            await fetcher({
                fetchUrl: "oblea",
                method: "POST",
                data: JSON.stringify(parseData),
            });
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };
    return (
        <form
            action=""
            onSubmit={handleSubmit(create)}
            className="max-w-lg grid place-items-center mx-auto gap-1 w-full h-[calc(100vh-64px)]  [&>div>div>span]:bg-white relative ´[&>div>div>input]:relative [&>div>div>input]:text-black "
        >
            <div className="w-full space-y-3  ">
                <AutoCompleteField name={"docentes"} setValueForm={setValue} control={control} placeholder="Seleccionar docente" />
                <ErrorMessage error={errors.docentes} />
                <MateriaDemo signature={signature} register={register} errors={errors} setValueForm={setValue} />
                <ErrorMessage error={errors.signature} />
                <Input placeholder="Puntaje del docente.." {...register("score")} name="score" type="number" className="remove-ring" />
                <ErrorMessage error={errors.score} />
                <SubmitButton disabled={isSubmitting}>{isSubmitting ? "Cargando..." : "Crear"}</SubmitButton>
            </div>
        </form>
    );
}
