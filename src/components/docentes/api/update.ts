"use server";
import { revalidatePath } from "next/cache";

export const update = async (data: Teacher) => {
    const url = `http://localhost:3000/api/docentes`;
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
        revalidatePath("/docentes");

        return result;
    } catch (error) {
        return error;
    }
};
