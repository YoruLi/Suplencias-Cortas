import React from "react";
import Table from "./components/table";
import { TableLoader } from "../dashboard/(overview)/components/dashboard-loader";
import Title from "@/components/ui/title";

export const revalidate = 0;
export default async function page({
    searchParams,
}: {
    searchParams: {
        query: string;
        currentPage?: string;
        pages?: string;
    };
}) {
    const query = searchParams.query ?? "";
    const pages = Number(searchParams?.pages) || 10;
    const currentPage = Number(searchParams?.currentPage) || 1;

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <Title className=" text-4xl font-normal text-main">Cargos</Title>

            <React.Suspense key={currentPage + pages} fallback={<TableLoader />}>
                <Table currentPage={currentPage} pages={pages} query={query} />
            </React.Suspense>
        </div>
    );
}
