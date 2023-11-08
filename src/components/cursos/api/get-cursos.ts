"use server";
import { revalidatePath } from "next/cache";

export const getCursos = async (query: string | undefined = undefined) => {
    let url;

    if (query !== undefined) url = `http://localhost:3000/api/cursos?modalidad=${query}`;
    else url = `http://localhost:3000/api/cursos`;

    try {
        const res = await fetch(url, {
            method: "GET",
        });

        const result = await res.json();
        revalidatePath("/cursos");
        return result as Curso[];
    } catch (error) {
        return [];
    }
};
