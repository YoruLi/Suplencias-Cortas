import CreateSignatureForm from "@/app/(pages)/materias/components/create-signature-form";
import { getPlanesDeEstudio } from "@/app/(pages)/plan-de-estudio/api/get";

import React from "react";

export default async function page() {
    const planes = await getPlanesDeEstudio();

    return (
        <>
            <div className="grid place-content-center h-full min-h-[calc(100dvh-56px)] mx-auto ">
                <CreateSignatureForm planes={planes} />
            </div>
        </>
    );
}
