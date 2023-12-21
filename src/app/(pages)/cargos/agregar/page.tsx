import CreateForm from "@/app/(pages)/cargos/components/form/create-form";

import { getCursos } from "@/app/(pages)/cursos/api/get-cursos";

import { getMateriasDocente } from "@/app/(pages)/materias/api/get-materias";
import Title from "@/components/ui/title";

import React from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        docente: string;
    };
}) {
    const docente = searchParams.docente ?? "";
    const [coursesPromise, signaturesPromise] = await Promise.allSettled([getCursos(), getMateriasDocente(docente)]);

    const courses = coursesPromise.status === "fulfilled" ? coursesPromise.value : [];
    const signature = signaturesPromise.status === "fulfilled" ? signaturesPromise.value : [];

    return (
        <>
            <div className="flex flex-col space-y-4 justify-center items-center h-full  min-h-[calc(100dvh-56px)] mx-auto  w-full max-w-xl">
                <div className="shadow-2xl shadow-slate-300 border border-slate-300/30 p-10 rounded">
                    <Title className="text-center">Agregar Cargo</Title>
                    <CreateForm courses={courses} signature={signature} />
                </div>
            </div>
        </>
    );
}
