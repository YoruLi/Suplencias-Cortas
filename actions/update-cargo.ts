"use server";
import { revalidatePath } from "next/cache";

export const updateCargos = async (data: FormData, cargo: Cargo) => {
    const formData = Object.fromEntries(data);

    const cargosUpdateData = {
        id: cargo.idCargos,
        ...formData,
    };

    const res = await fetch(`http://localhost:3000/api/cargos/${cargo.idCargos}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cargosUpdateData),
    });

    revalidatePath(`/cargos`);
};
