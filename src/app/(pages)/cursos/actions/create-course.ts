"use server";

import { fetcher } from "@/utils/fetch-url";
import { formCourseValidation } from "@/validation/zod";
import { revalidatePath } from "next/cache";

import { ZodError } from "zod";

export const createCourse = async (data: FormData, modalidad: string) => {
    const form = Object.fromEntries(data);

    const courseData = {
        ...form,
        modalidad,
    };
    const validatedCouseData = formCourseValidation.safeParse(courseData);
    if (!validatedCouseData.success) {
        if (validatedCouseData.error instanceof ZodError) {
            return {
                error: "ZodError",
                data: validatedCouseData.error.issues,
            };
        }
    }
    const result = fetcher({
        fetchUrl: "cursos",
        method: "POST",
        data: JSON.stringify(courseData),
    });

    revalidatePath("/cursos");

    return result;
};
