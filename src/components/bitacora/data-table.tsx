import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { fetchUrl } from "@/utils/fetch-url";
export async function getBitacora() {
    const res = await fetch(fetchUrl("bitacora"));

    return await res.json();
}

export default async function Table() {
    const bitacora = await getBitacora();
    return bitacora.length > 0 ? (
        <>
            <span>Bitacora</span>
            <DataTable columns={columns} data={bitacora} />
        </>
    ) : (
        <span>No hay bitacora disponible...</span>
    );
}
