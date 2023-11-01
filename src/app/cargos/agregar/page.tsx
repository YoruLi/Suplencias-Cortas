import { CalendarDemo } from "@/components/calendar";
import { MateriaList } from "@/components/combo-box";
import { CoursesList } from "@/components/cursos-list";
import Search from "@/components/search";

import TeachersList from "@/components/teachers-list";
import { Button } from "@/components/ui/button";

import React from "react";

interface TeacherResponse {
    teachers: Teacher[];
}

interface CursosResponse {
    cursos: Curso[];
}

interface MateriasResponse {
    materias: Materia[];
}
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

    const getTeachers = async ({ query }: { query?: string }): Promise<TeacherResponse | Error> => {
        try {
            if (!query) {
                return new Error("No query provided");
            }
            const res = await fetch(`http://localhost:3000/api/docentes?query=${query}`);

            const result = await res.json();

            return {
                teachers: result,
            };
        } catch (error) {
            return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const getCursos = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/cursos`);

            const result = await res.json();

            return {
                cursos: result,
            };
        } catch (error) {
            return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const getMaterias = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/materias`);

            const result = await res.json();

            return {
                materias: result,
            };
        } catch (error) {
            return new Error("Error fetching materias: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const { teachers } = (await getTeachers({ query: search })) as TeacherResponse;

    const { cursos } = (await getCursos()) as CursosResponse;

    const { materias } = (await getMaterias()) as MateriasResponse;

    const handleSubmit = async (data: FormData) => {
        "use server";
        console.log(data.getAll("day"));
        console.log(data.getAll("hour"));
        console.log({ searchParams });

        const teacher = searchParams.docente;
        const materias = searchParams.materias;
        const curso = searchParams.curso;

        const days = data.getAll("day");
        const hour = data.getAll("hour");

        const cargos = {
            teacher,
            materias,
            curso,
            days,
            hour,
        };
        const res = await fetch(`api/cargos`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cargos),
        });

        const result = await res.json();

        console.log(result);
    };

    return (
        <div className="space-y-6">
            <h2 className="">Cargos a cubrir</h2>
            <div className="space-y-6 flex flex-col justify-center items-center mx-auto max-w-xl">
                <form action={handleSubmit} className="[&>div>div>span]:bg-white relative ´[&>div>div>input]:relative [&>div>div>input]:text-black space-y-5">
                    <Search />
                    <TeachersList teachers={teachers} />
                    <div className="flex">
                        <MateriaList data={materias} />
                        <CoursesList data={cursos} />
                    </div>
                    <CalendarDemo />

                    <Button className="w-full mx-auto">Confirmar</Button>
                </form>
            </div>
        </div>
    );
}
