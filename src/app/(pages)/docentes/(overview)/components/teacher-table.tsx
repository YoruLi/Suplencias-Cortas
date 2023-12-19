import { getPaginationTeachers } from "@/app/(pages)/docentes/api/get-teachers";
import { columns } from "@/app/(pages)/docentes/components/columns";
import { DataTable } from "@/components/ui/data-table";

import { MobileTable } from "./mobile-table";

export default async function TeachersTable({ pages, currentPage }: { pages: number; currentPage: number }) {
    const teachers = await getPaginationTeachers({ currentPage, pages });

    return (
        <>
            <DataTable columns={columns} data={teachers} toggleColumns={true} searchBar={true} currentPage={currentPage} pagination={true} ShowMobile={MobileTable} />
        </>
    );
}
