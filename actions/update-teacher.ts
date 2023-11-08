"use server";

import { update } from "@/components/docentes/api/update";
import { revalidatePath } from "next/cache";

export const editTeacher = async (data: FormData, teacher: Teacher) => {
    const formData = Object.fromEntries(data);
    const { fullname, email, tel, dni, dir, score } = formData;
    const objectData = {
        idDocentes: teacher.idDocentes,
        nombreCompleto: fullname,
        email,
        tel,
        dni,
        dir,
        score,
    };

    const res = await update(objectData);
    revalidatePath("/docentes");
};
