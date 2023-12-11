import CreateForm from "@/components/cargos/create-form";

import { getCursos } from "@/components/cursos/api/get-cursos";

import { getMateriasDocente } from "@/components/materias/api/get-materias";

import React from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        docente: string;
    };
}) {
    const docente = searchParams.docente ?? null;
    const [coursesPromise, signaturesPromise] = await Promise.allSettled([getCursos(), getMateriasDocente(docente)]);
    const courses = coursesPromise.status === "fulfilled" ? coursesPromise.value : [];
    const signature = signaturesPromise.status === "fulfilled" ? signaturesPromise.value : [];

    console.log({ signature });
    return (
        <>
            <div className="flex flex-col space-y-4 justify-center items-center h-full  min-h-[calc(100dvh-56px)] mx-auto  w-full max-w-xl">
                <h2 className="text-2xl font-telex tracking-widest">Agregar Cargo</h2>
                <CreateForm courses={courses} signature={signature} />
            </div>
        </>
    );
}
