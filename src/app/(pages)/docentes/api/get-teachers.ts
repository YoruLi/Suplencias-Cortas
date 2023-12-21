"use server";

import { conn } from "@/libs/mysql/db";
import { fetcher } from "@/utils/fetch-url";
import { plainObject } from "@/utils/utils";

import { revalidatePath } from "next/cache";

export const getTeachers = async ({ query }: { query?: string | null }): Promise<Teacher[]> => {
    try {
        const result = await fetcher({
            fetchUrl: `docentes?query=${query}`,
            method: "GET",
        });

        return result;
    } catch (error) {
        return [];
    }
};

export const getPaginationTeachers = async ({ query, currentPage, pages }: { query?: string; currentPage: number; pages: number }): Promise<Teacher[]> => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);
        const teachers: Teacher[] = await conn.query(`
            SELECT *
            FROM docentes
            WHERE
            docentes.nombreCompleto LIKE "%${query}%" OR
            docentes.email LIKE "%${query}%" OR
            docentes.localidad LIKE "%${query}%"
            ORDER BY docentes.createdAt DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);
        revalidatePath("/docentes");
        return plainObject(teachers);
    } catch (error) {
        return [];
    }
};

export async function fetchTeachersPages({ query }: { query: string }) {
    try {
        const count = await conn.query(`SELECT COUNT(*) as total
    FROM docentes
    WHERE
      docentes.nombreCompleto LIKE "%${query}%" OR
      docentes.email LIKE "%${query}%" OR
      docentes.localidad LIKE "%${query}%"
  `);
        const results = JSON.stringify(count);
        const json: TotalPages[] = JSON.parse(results);

        const totalPages = Math.ceil(Number(json[0].total) / 10);

        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of teachers.");
    }
}
