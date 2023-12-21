import { fetchTeachersPages, getPaginationTeachers } from "@/app/(pages)/docentes/api/get-teachers";
import { columns } from "@/app/(pages)/docentes/components/columns";
import { DataTable } from "@/components/ui/data-table";

import { MobileTable } from "./mobile-table";

export default async function TeachersTable({ query, pages, currentPage }: { query: string; pages: number; currentPage: number }) {
    const teachers = await getPaginationTeachers({ query, currentPage, pages });
    const totalPages = await fetchTeachersPages({ query });

    return (
        <>
            <DataTable
                placeholder={"Buscar docentes"}
                columns={columns}
                data={teachers}
                totalPages={totalPages}
                toggleColumns={true}
                searchBar={true}
                currentPage={currentPage}
                pagination={true}
                ShowMobile={MobileTable}
            />
        </>
    );
}
