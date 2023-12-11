import { getPaginationTeachers } from "@/components/docentes/api/get-teachers";
import { columns } from "@/components/docentes/columns";
import { DataTable } from "@/components/ui/data-table";

export default async function TeachersTable({ pages, currentPage }: { pages: number; currentPage: number }) {
    const teachers = await getPaginationTeachers({ currentPage, pages });

    return (
        <>
            <DataTable columns={columns} data={teachers} toggleColumns={true} searchBar={true} currentPage={currentPage} pagination={true} />
        </>
    );
}
