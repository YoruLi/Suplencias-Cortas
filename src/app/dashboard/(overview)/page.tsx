import Cards from "@/components/bitacora/cards";

import Table from "@/components/bitacora/data-table";
import CardLoader from "@/components/bitacora/loader";
import { TableLoader } from "@/components/dashboard-loader";

import Title from "@/components/ui/title";

import React from "react";

export default async function page() {
    return (
        <div className="space-y-10">
            <div className="mx-auto">
                <Title>Dashboard</Title>

                <React.Suspense fallback={<CardLoader />}>
                    <Cards />
                </React.Suspense>
            </div>

            <React.Suspense fallback={<TableLoader />}>
                <Table />
            </React.Suspense>
        </div>
    );
}
