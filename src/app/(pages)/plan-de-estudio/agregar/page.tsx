import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/ui/title";
import { planValidation } from "@/validation/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
    const createPlan = async (data: FormData) => {
        "use server";

        const formData = Object.fromEntries(data);
        const validatedData = planValidation.safeParse(formData);

        if (!validatedData.success) {
            console.log(validatedData.error);
            return;
        }
        const res = await fetch("http://localhost:3000/api/plan-de-estudio", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(formData),
        });

        return redirect("/plan-de-estudio");
    };
    return (
        <div className="mx-auto grid  justify-items-center items-center h-screen w-full">
            <form action={createPlan} className="flex flex-col gap-3 w-full max-w-md text-center">
                <Title>Agregar Plan de Estudio</Title>
                <Input placeholder="Nombre del plan..." name="nombre" className="!outline-none !focus:outline-none !ring-0 !ring-offset-0" />
                <Textarea
                    rows={4}
                    name="descripcion"
                    placeholder={"Descripcion del plan..."}
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 resize-none"
                />
                <Textarea
                    rows={4}
                    name="resolucion"
                    placeholder={"Resolucion del plan..."}
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 resize-none"
                />

                <Button type="submit">Crear Plan</Button>
            </form>
        </div>
    );
}
