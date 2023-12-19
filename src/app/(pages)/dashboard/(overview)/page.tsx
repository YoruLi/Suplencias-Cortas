import Cards from "@/app/(pages)/dashboard/bitacora/cards";

import Table from "@/app/(pages)/dashboard/bitacora/data-table";
import CardLoader from "@/app/(pages)/dashboard/bitacora/loader";
import { TableLoader } from "@/app/(pages)/dashboard/(overview)/components/dashboard-loader";

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
        dashboard: string;
    };
}) {
    const pages = Number(searchParams?.pages) || 10;
    const currentPage = Number(searchParams?.currentPage) || 1;

    const dashboard = searchParams.dashboard || "docentes";

    return (
        <div className="space-y-10">
            <div className="mx-auto">
                <Title className=" text-4xl font-normal text-main">Dashboard</Title>
                <React.Suspense fallback={<CardLoader />}>
                    <Cards />
                </React.Suspense>
            </div>

            <div className="flex flex-col gap-2">
                <Card className="flex-[2] h-full rounded-lg border">
                    <CardHeader>
                        <CardTitle>{dashboard.toLocaleUpperCase()}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview dashboard={dashboard} />
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
