"use server";

import { conn } from "@/libs/mysql/db";

import { revalidatePath } from "next/cache";

export const getTeachers = async ({ query }: { query?: string | null }): Promise<Teacher[]> => {
    let url;

    if (typeof query === "string" || query === undefined) {
        url = `http://localhost:3000/api/docentes?query=${query}`;
    }

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return [];
    }
};

export const getPaginationTeachers = async ({ currentPage, pages }: { currentPage: number; pages: number }): Promise<Teacher[]> => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);
        const teachers = await conn.query(`
            SELECT *
            FROM docentes
            ORDER BY docentes.createdAt DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);
        revalidatePath("/docentes");
        return teachers;
    } catch (error) {
        return [];
    }
};
