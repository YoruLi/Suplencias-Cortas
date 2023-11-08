import Input from "@/components/Input";
import { getPlanesDeEstudio } from "@/components/plan-de-estudio/api/get";
import SubmitButton from "@/components/submit-button";
import { SelectItem } from "@/components/ui/select";
import { SelectItems } from "@/components/ui/select-items";
import Title from "@/components/ui/title";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
    const signatureDays = ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo"];

    const planes = await getPlanesDeEstudio();

    console.log({ planes });

    const createSignature = async (data: FormData) => {
        "use server";

        const formData = Object.fromEntries(data);

        await fetch("http://localhost:3000/api/materias", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        revalidatePath("/materias");
        return redirect("/materias");
    };

    return (
        <>
            <div className="grid place-items-center h-full lg:min-h-[calc(100dvh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto ">
                <form action={createSignature} className="max-w-md flex flex-col items-center justify-between gap-3 w-full ">
                    <Title>Agregar matetia</Title>
                    <Input name="name" placeholder="Nombre de materia..." />

                    <div className="flex gap-3">
                        <SelectItems placeholder="Selecciona el año" title="Años" formData="year">
                            {signatureDays.map(day => (
                                <SelectItem value={day} className="capitalize">
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectItems>
                        <SelectItems placeholder="Selecciona el plan" title="Planes de estudio" formData="planId">
                            {planes.map(plan => (
                                <SelectItem value={plan.id} className="capitalize">
                                    {plan.nombre}
                                </SelectItem>
                            ))}
                        </SelectItems>
                    </div>

                    <SubmitButton content="Crear materia" />
                </form>
            </div>
        </>
    );
}
