import Title from "@/components/ui/title";

import React, { Suspense } from "react";
import TeachersTable from "./components/teacher-table";
import { TableLoader } from "./components/loader";

export default async function page({
    searchParams,
}: {
    searchParams: {
        currentPage?: string;
        pages?: string;
    };
}) {
    const pages = Number(searchParams?.pages) || 10;
    const currentPage = Number(searchParams?.currentPage) || 1;
    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <Title>Docentes</Title>

            <Suspense key={currentPage} fallback={<TableLoader />}>
                <TeachersTable currentPage={currentPage} pages={pages} />
            </Suspense>
        </div>
    );
}
