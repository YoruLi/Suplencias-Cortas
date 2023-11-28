import CreateSignatureForm from "@/components/materias/create-signature-form";
import { getPlanesDeEstudio } from "@/components/plan-de-estudio/api/get";

import React from "react";

export default async function page() {
    const planes = await getPlanesDeEstudio();

    return (
        <>
            <div className="grid place-items-center h-full lg:min-h-[calc(100dvh-56px)] min-h-[calc(100dvh-56px-56px)] mx-auto ">
                <CreateSignatureForm planes={planes} />
            </div>
        </>
    );
}
