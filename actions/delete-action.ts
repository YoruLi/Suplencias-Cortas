"use server";

import { revalidatePath } from "next/cache";

export const deleteAction = async (entity: string, planId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/${entity}/${planId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        revalidatePath(`/${entity}`);
        return result;
    } catch (error: any) {
        return { message: error.message };
    }
};
