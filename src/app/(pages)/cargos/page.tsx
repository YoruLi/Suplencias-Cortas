import { getCargos } from "@/components/cargos/api/get-cargos";
import { columns } from "@/components/cargos/columns";
import { DataTable } from "@/components/cargos/data-table";

import React from "react";

export const revalidate = 0;
export default async function page() {
    const cargos = await getCargos();

    // const getCargosVacantes = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/api/cargos-vacantes`, {
    //             cache: "no-store",
    //             method: "GET",
    //         });

    //         const result = await res.json();

    //         return result;
    //     } catch (error) {
    //         return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
    //     }
    // };

    // const cargosACubrir = await getCargosVacantes();

    const getCandidatos = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/candidates`, {
                cache: "no-store",
                method: "GET",
            });

            const result = await res.json();

            return result;
        } catch (error) {
            return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    const candidatos = await getCandidatos();
    console.log(candidatos);

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <h2 className="text-2xl font-telex tracking-widest py-4">Cargos</h2>

            <DataTable columns={columns} data={cargos} />

            {candidatos.map(data => (
                <pre>{JSON.stringify(data)}</pre>
            ))}
        </div>
    );
}
