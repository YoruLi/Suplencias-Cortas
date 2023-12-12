import Title from "@/components/ui/title";
import React from "react";
import ObleaForm from "./components/form";
import { getMaterias } from "@/app/(pages)/materias/api/get-materias";

export default async function page() {
    const signature = await getMaterias();

    return (
        <>
            <ObleaForm signature={signature} />
        </>
    );
}
