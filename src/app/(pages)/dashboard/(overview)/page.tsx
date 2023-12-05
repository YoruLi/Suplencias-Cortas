import Cards from "@/components/bitacora/cards";

import Table from "@/components/bitacora/data-table";
import CardLoader from "@/components/bitacora/loader";
import { TableLoader } from "@/components/dashboard-loader";

import Title from "@/components/ui/title";

import React from "react";
import { Overview } from "./components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function page() {
    return (
        <div className="space-y-10">
            <div className="mx-auto">
                <Title>Dashboard</Title>

                <React.Suspense fallback={<CardLoader />}>
                    <Cards />
                </React.Suspense>
            </div>

            <div className="flex xl:flex-row flex-col gap-2">
                <Card className="flex-[2] h-full rounded-lg border">
                    <CardHeader>
                        <CardTitle>Docentes</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card>

                <div className="flex-0">
                    <React.Suspense fallback={<TableLoader />}>
                        <Table />
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
}
