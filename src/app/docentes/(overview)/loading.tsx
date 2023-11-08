import { TableLoader } from "@/components/dashboard-loader";
import React from "react";

export default function loading() {
    return (
        <div className="relative h-full w-full  flex flex-col  overflow-hidden">
            <h2 className="text-2xl font-telex tracking-widest py-4">Docentes</h2>

            <div className="w-full  mx-auto place-content-center grid mt-6">
                <TableLoader />
            </div>
        </div>
    );
}
