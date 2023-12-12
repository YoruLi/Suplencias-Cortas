import React from "react";
import Table from "./components/table";
import { TableLoader } from "../dashboard/(overview)/components/dashboard-loader";
import Title from "@/components/ui/title";

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

    // //////////////////////////////////////////////////////////////////////////
    // const getCargosVacantes = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/api/cargos-vacantes`, {
    //             cache: "no-store",
    //             method: "GET",
    //         });

    //         const result = await res.json();

    //         return result;
    //     } catch (error) {
    //         return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
    //     }
    // };

    // const cargosACubrir = await getCargosVacantes();

    // CREAR VENTANA CARGOS VACANTES

    /////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className=" h-full w-full  flex flex-col gap-4  relative overflow-hidden">
            <Title className=" text-4xl font-normal text-main">Cargos</Title>
            <React.Suspense key={currentPage + pages} fallback={<TableLoader />}>
                <Table currentPage={currentPage} pages={pages} />
            </React.Suspense>
        </div>
    );
}
