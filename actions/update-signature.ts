"use server";
import { editSignature } from "@/components/materias/api/edit";
import { revalidatePath } from "next/cache";
export const edit = async (id: string, data: FormData) => {
    const formData = Object.fromEntries(data);

    const { name, year } = formData;
    const signatureObject = {
        codigoMateria: id,
        nombre: name,
        año: year,
    };
    await editSignature(signatureObject);

    return revalidatePath("/materias");
};
