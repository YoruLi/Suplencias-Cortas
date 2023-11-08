import { getMaterias } from "@/components/materias/api/get-materias";
import SheetItem from "@/components/plan-de-estudio/sheet-item";

import React from "react";

export const revalidate = 0;
export default async function page() {
    const materias = await getMaterias();

    return (
        <>
            <h2 className="text-2xl font-telex tracking-widest py-4">Materias</h2>
            <div className=" w-full gap-6  grid-cols-signatures grid">
                {materias.map((materia, index) => (
                    <SheetItem materia={materia} key={materia.codigoMateria} index={index} />
                ))}
            </div>
        </>
    );
}
