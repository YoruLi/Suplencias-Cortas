"use server";

import { revalidatePath } from "next/cache";

export const deleteAction = async (entity: string, planId: string) => {
    const result = await fetch(`http://localhost:3000/api/${entity}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(planId),
    });
    return revalidatePath(`/${entity}`);
};
