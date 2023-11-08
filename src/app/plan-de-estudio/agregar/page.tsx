import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Title from "@/components/ui/title";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
    const createPlan = async (data: FormData) => {
        "use server";

        const formData = Object.fromEntries(data);

        const res = await fetch("http://localhost:3000/api/plan-de-estudio", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(formData),
        });

        revalidatePath("/plan-de-estudio");
        redirect("/plan-de-estudio");
    };
    return (
        <>
            <Title>Agregar Plan de Estudio</Title>

            <form action={createPlan} className="flex flex-col gap-3 w-full max-w-lg">
                <Input placeholder="Nombre del plan..." name="name" className="!outline-none !focus:outline-none !ring-0 !ring-offset-0" />
                <Textarea
                    rows={4}
                    name="description"
                    placeholder={"Description del plan..."}
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 resize-none"
                />
                <Textarea
                    rows={4}
                    name="resolution"
                    placeholder={"Resolucion del plan..."}
                    className="!outline-none !focus:outline-none !ring-0 !ring-offset-0 resize-none"
                />
                <div>
                    <Button type="submit">Crear Plan</Button>
                </div>
            </form>
        </>
    );
}
