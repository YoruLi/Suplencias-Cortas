"use server";
import { create } from "@/components/docentes/api/create-teacher";
import { revalidatePath } from "next/cache";

interface TeacherProps extends Omit<Teacher, "idDocentes" | "nombreCompleto"> {}
export const createTeacher = async (data: TeacherProps) => {
    const res = await create(data);

    revalidatePath(`/docentes`);
    return res;
};
