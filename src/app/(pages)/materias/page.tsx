import { getMaterias } from "@/app/(pages)/materias/api/get-materias";
import SheetItem from "@/app/(pages)/plan-de-estudio/components/sheet-item";
import Title from "@/components/ui/title";

import React from "react";

export const revalidate = 0;
export default async function page() {
    const materias = await getMaterias();

    return (
        <>
            <Title className=" text-4xl font-normal text-main">Materias</Title>
            <div className=" w-full gap-6  grid-cols-signatures grid">
                {materias.map((materia, index) => (
                    <SheetItem materia={materia} key={materia.codigoMateria} />
                ))}
            </div>
        </>
    );
}
