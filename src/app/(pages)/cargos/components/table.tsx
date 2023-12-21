import React from "react";
import { DataTable } from "@/components/ui/data-table";

import { fetchTeacherPositionPages, getPaginationCargos } from "../api/get-cargos";
import { columns } from "./columns";
import { MobileTable } from "./mobile-table";

export default async function Table({ query, currentPage, pages }: { query: string; currentPage: number; pages: number }) {
    const cargos = await getPaginationCargos({ query, currentPage, pages });
    const totalPages = await fetchTeacherPositionPages({ query });

    return (
        <DataTable
            columns={columns}
            data={cargos}
            currentPage={currentPage}
            totalPages={totalPages}
            pagination={true}
            searchBar={true}
            toggleColumns={true}
            ShowMobile={MobileTable}
            placeholder="Buscar docentes"
        />
    );
}
