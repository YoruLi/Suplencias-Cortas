"use server";

import { editSignature } from "@/app/(pages)/materias/api/edit";
import { revalidatePath } from "next/cache";
export const edit = async (id: string, data: FormData) => {
    const formData = Object.fromEntries(data);

    const { name, year } = formData;
    const signatureObject = {
        ...(name && { nombre: name }),
        ...(year && { año: year }),
    };
    await editSignature(id, signatureObject);

    return revalidatePath("/materias");
};
