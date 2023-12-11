import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";

import { conn } from "@/libs/mysql/db";
import { revalidatePath } from "next/cache";

const getBitacora = async ({ currentPage, pages }: { currentPage: number; pages: number }): Promise<Teacher[]> => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);

        console.log(pages, offset);
        const results = await conn.query(`
            SELECT *
            FROM bitacora
     
            ORDER BY bitacora.fecha DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);

        revalidatePath("/dashboard");
        return results;
    } catch (error) {
        return [];
    }
};

export default async function Table({ pages, currentPage }: { pages: number; currentPage: number }) {
    const bitacora = await getBitacora({ currentPage, pages });
    return (
        <>
            <DataTable columns={columns} data={bitacora} currentPage={currentPage} pagination={true} />
        </>
    );
}
