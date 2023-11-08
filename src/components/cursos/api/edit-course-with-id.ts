"use server";
import { revalidatePath } from "next/cache";

export const editCourseWithId = async (data: Curso) => {
    const url = `http://localhost:3000/api/cursos`;
    try {
        const res = await fetch(url, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        revalidatePath("/cursos");

        return result;
    } catch (error) {
        return error;
    }
};
