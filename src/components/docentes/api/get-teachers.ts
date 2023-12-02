"use server";
import { revalidatePath } from "next/cache";

export const getTeachers = async ({ query }: { query?: string | null }): Promise<Teacher[]> => {
    let url;

    if (typeof query === "string" || query === undefined) url = `http://localhost:3000/api/docentes?query=${query}`;
    else url = `http://localhost:3000/api/docentes`;

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        const result = await res.json();

        revalidatePath("/docentes");
        return result;
    } catch (error) {
        return [];
    }
};
