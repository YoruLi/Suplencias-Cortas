"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URLSearchParams } from "url";

export const updateCargos = async (data: FormData, cargo: Cargo, searchParams: URLSearchParams) => {
    const formData = Object.fromEntries(data);
    const params = new URLSearchParams(searchParams);
    const docenteId = params.get("docente")?.split("/")[0];

    const cargosUpdateData = {
        id: cargo.idCargos,
        docenteId: docenteId,
        ...formData,
    };

    const res = await fetch("http://localhost:3000/api/cargos", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cargosUpdateData),
    });
    redirect("/cargos");
    return revalidatePath(`/cargos`);
};
