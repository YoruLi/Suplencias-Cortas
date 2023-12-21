import React from "react";
import { DataTable } from "../../../../components/ui/data-table";
import { columns } from "./columns";

import { MobileTable } from "../(overview)/components/mobile-table";
import { fetchDashboardTotalPages, getBitacora } from "../api/get";

export default async function Table({ pages, currentPage }: { pages: number; currentPage: number }) {
    const bitacora = await getBitacora({ currentPage, pages });
    const totalPages = await fetchDashboardTotalPages();

    return (
        <>
            <DataTable columns={columns} data={bitacora} currentPage={currentPage} pagination={true} ShowMobile={MobileTable} totalPages={totalPages} />
        </>
    );
}
