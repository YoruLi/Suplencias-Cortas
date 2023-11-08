import { getTeachers } from "@/components/docentes/api/get-teachers";
import { columns } from "@/components/docentes/columns";
import { DataTable } from "@/components/ui/data-table";
import Title from "@/components/ui/title";

import React from "react";

export default async function page() {
    const teachers = await getTeachers({ query: null });

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <Title>Docentes</Title>

            <DataTable columns={columns} data={teachers} />
        </div>
    );
}
