import Title from "@/components/ui/title";
import React from "react";
import ObleaForm from "./components/form";
import { getMaterias } from "@/components/materias/api/get-materias";

export default async function page() {
    const signature = await getMaterias();

    return (
        <>
            <Title>Docentes / Crear Oblea</Title>
            <ObleaForm signature={signature} />
        </>
    );
}
