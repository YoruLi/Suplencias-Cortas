"use server";

import { deleteCourse } from "@/app/(pages)/cursos/api/delete-course";
import { revalidatePath } from "next/cache";

export const deleteAction = async (cursoId: string) => {
    const res = await deleteCourse(cursoId);

    revalidatePath("/cursos");

    return res;
};
