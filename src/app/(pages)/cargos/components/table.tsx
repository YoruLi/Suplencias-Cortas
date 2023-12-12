import React from "react";
import { DataTable } from "@/components/ui/data-table";

import { getPaginationCargos } from "../api/get-cargos";
import { columns } from "./columns";

export default async function Table({ currentPage, pages }: { currentPage: number; pages: number }) {
    const cargos = await getPaginationCargos({ currentPage, pages });

    return <DataTable columns={columns} data={cargos} currentPage={currentPage} pagination={true} searchBar={true} toggleColumns={true} />;
}
