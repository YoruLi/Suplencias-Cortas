"use server";
import { revalidatePath } from "next/cache";

export const editPlanDeEstudio = async (data: any) => {
    const url = `http://localhost:3000/api/plan-de-estudio/${data.id}`;
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
        revalidatePath("/plan-de-estudio");

        return result;
    } catch (error) {
        return error;
    }
};
