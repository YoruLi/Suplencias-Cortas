import { getCursos } from "@/app/(pages)/cursos/api/get-cursos";
import { SheetDemo } from "@/app/(pages)/cursos/components/sheet";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Title from "@/components/ui/title";
import Link from "next/link";
import React from "react";

export const revalidate = 0;

type Props = {
    searchParams?: {
        modalidad?: string;
    };
};

export default async function page({ searchParams }: Props) {
    const cursos = await getCursos(searchParams?.modalidad);

    return (
        <div className="w-full h-full flex gap-4 flex-col">
            <Title className=" text-4xl font-normal text-main">Cursos</Title>

            <Tabs defaultValue="cursos" className="flex flex-col items-center gap-4">
                <TabsList>
                    <TabsTrigger value="cursos" asChild>
                        <Link href={"cursos"}>Todos</Link>
                    </TabsTrigger>
                    <TabsTrigger value="informatica" asChild>
                        <Link href={"cursos?modalidad=informatica"}>Informática</Link>
                    </TabsTrigger>

                    <TabsTrigger value="quimica" asChild>
                        <Link href={"cursos?modalidad=quimica"}>Quimica</Link>
                    </TabsTrigger>

                    <TabsTrigger value="construccion" asChild>
                        <Link href={"cursos?modalidad=construccion"}>Construccion</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-courses  gap-3 w-full mx-auto ">
                {cursos?.map(curso => (
                    <div key={curso.id}>
                        <SheetDemo cursoData={curso} />
                    </div>
                ))}

                {cursos.length === 0 ? <pre className="mx-auto">No se encontraron cursos</pre> : null}
            </div>
        </div>
    );
}
