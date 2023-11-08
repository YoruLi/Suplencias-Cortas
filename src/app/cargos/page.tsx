import { getCargos } from "@/components/cargos/api/get-cargos";
import { columns } from "@/components/cargos/columns";
import { DataTable } from "@/components/cargos/data-table";

import React from "react";

export const revalidate = 0;
export default async function page() {
    const cargos = await getCargos();

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <h2 className="text-2xl font-telex tracking-widest py-4">Cargos</h2>

            <DataTable columns={columns} data={cargos} />
        </div>
    );
}
