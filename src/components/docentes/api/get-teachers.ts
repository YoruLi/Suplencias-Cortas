"use server";
import { revalidatePath } from "next/cache";

export const getTeachers = async ({ query }: { query?: string | null }): Promise<TeachersResponse> => {
    let url;

    if (typeof query === "string" || query === undefined) url = `http://localhost:3000/api/docentes?query=${query}`;
    else url = `http://localhost:3000/api/docentes`;
    console.log(url);
    try {
        const res = await fetch(url);

        const result = await res.json();
        console.log(result);

        revalidatePath("/docentes");
        return result;
    } catch (error) {
        return {
            success: false,
            message: "Error fetching teachers",
        };
    }
};
