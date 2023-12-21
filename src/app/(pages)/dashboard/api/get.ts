"use server";
import { conn } from "@/libs/mysql/db";
import { plainObject } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export const getBitacora = async ({ currentPage, pages }: { currentPage: number; pages: number }): Promise<any[]> => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);

        const results: Bitacora[] = await conn.query(`
            SELECT *
            FROM bitacora
            ORDER BY bitacora.fecha DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);

        revalidatePath("/dashboard");

        return plainObject(results);
    } catch (error) {
        return [];
    }
};

export const fetchDashboardTotalPages = async () => {
    try {
        const count = await conn.query(`SELECT COUNT(*) as total
    FROM Bitacora
  `);
        const results = JSON.stringify(count);
        const json: TotalPages[] = JSON.parse(results);

        const totalPages = Math.ceil(Number(json[0].total) / 10);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of bitacora.");
    }
};
