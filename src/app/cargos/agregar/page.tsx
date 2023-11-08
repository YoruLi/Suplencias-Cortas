import { CalendarDemo } from "@/components/calendar";
import { MateriaList } from "@/components/combo-box";
import { CoursesList } from "@/components/cursos-list";
import { getCursos } from "@/components/cursos/api/get-cursos";
import { getTeachers } from "@/components/docentes/api/get-teachers";
import { getMaterias } from "@/components/materias/api/get-materias";
import Search from "@/components/search";

import TeachersList from "@/components/teachers-list";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

import React from "react";

export const revalidate = 0;
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const teachers = await getTeachers({ query: search });
    const cursos = await getCursos();
    const materias = await getMaterias();

    const handleSubmit = async (data: FormData) => {
        "use server";

        const teacher = searchParams.docente;

        const materias = searchParams.materias;
        const curso = searchParams.curso;

        const days = data.getAll("day");
        const hour = data.getAll("hour");

        const cargos = {
            docenteId: teacher?.split("/")[0],
            materias,
            curso,
            days,
            hour,
        };
        const res = await fetch(`http://localhost:3000/api/cargos`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cargos),
        });

        const result = await res.json();
        revalidatePath("/cargos", "page");
        console.log(result);
    };

    return (
        <>
            <div className="space-y-6 flex flex-col justify-center items-center h-full lg:min-h-[calc(100vh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto max-w-xl">
                <h2 className="text-2xl font-telex tracking-widest">Agregar Cargo</h2>
                <form action={handleSubmit} className="[&>div>div>span]:bg-white relative ´[&>div>div>input]:relative [&>div>div>input]:text-black space-y-5">
                    <Search search="/cargos/agregar" />
                    <TeachersList teachers={teachers} />
                    <div className="flex">
                        <MateriaList data={materias} />
                        <CoursesList data={cursos} />
                    </div>
                    <CalendarDemo />

                    <Button className="w-full mx-auto">Confirmar</Button>
                </form>
            </div>
        </>
    );
}
