"use server";

import { revalidatePath } from "next/cache";

export const createTeacher = async (data: Teacher) => {
    const validatedValues = {};
    const res = await fetch(`http://localhost:3000/api/docentes`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return revalidatePath("/docentes");
};
