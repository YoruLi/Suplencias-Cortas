"use server";

import { formCourseValidation } from "@/validation/zod";
import { revalidatePath } from "next/cache";

import { ZodError } from "zod";

export const createCourse = async (data: FormData, modalidad: string) => {
    const form = Object.fromEntries(data);

    const courseData = {
        ...form,
        modalidad,
    };
    console.log(courseData);
    console.log(modalidad);
    const validatedCouseData = formCourseValidation.safeParse(courseData);

    if (!validatedCouseData.success) {
        if (validatedCouseData.error instanceof ZodError) {
            return {
                error: "ZodError",
                data: validatedCouseData.error.issues,
            };
        }
    }

    const response = await fetch("http://localhost:3000/api/cursos", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
    });

    const result = await response.json();
    revalidatePath("/cursos");

    return result;
};
