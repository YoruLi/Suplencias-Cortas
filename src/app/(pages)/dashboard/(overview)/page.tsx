import Cards from "@/components/bitacora/cards";

import Table from "@/components/bitacora/data-table";
import CardLoader from "@/components/bitacora/loader";
import { TableLoader } from "@/components/dashboard-loader";

import Title from "@/components/ui/title";

import React from "react";
import { Overview } from "./components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page({
    searchParams,
}: {
    searchParams: {
        pages: number;
        currentPage: number;
    };
}) {
    const pages = Number(searchParams?.pages) || 10;
    const currentPage = Number(searchParams?.currentPage) || 1;

    return (
        <div className="space-y-10">
            <div className="mx-auto">
                <Title>Dashboard</Title>

                <React.Suspense fallback={<CardLoader />}>
                    <Cards />
                </React.Suspense>
            </div>

            <div className="flex flex-col gap-2">
                <Card className="flex-[2] h-full rounded-lg border">
                    <CardHeader>
                        <CardTitle>Docentes</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>

                <div className="flex-0">
                    <React.Suspense key={currentPage + pages} fallback={<TableLoader />}>
                        <Table pages={pages} currentPage={currentPage} />
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
}
