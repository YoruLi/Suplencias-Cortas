"use server";
import { fetcher } from "@/utils/fetch-url";
import { revalidatePath } from "next/cache";

export const updateCargos = async (data: FormData, cargo: Cargo) => {
    const formData = Object.fromEntries(data);

    const cargosUpdateData = {
        id: cargo.idCargos,
        ...formData,
    };

    const result = fetcher({
        fetchUrl: `cargos/${cargo.idCargos}`,
        method: "PUT",
        data: JSON.stringify(cargosUpdateData),
    });

    revalidatePath(`/cargos`);
    return result;
};

export const updateCargoToCandidate = async ({ candidatoId, cargoId }: { candidatoId: string; cargoId: string }) => {
    try {
        const cargosUpdateData = {
            candidatoId,
            cargoId,
        };

        const result = fetcher({
            fetchUrl: `cargos/update-candidate`,
            method: "PUT",
            data: JSON.stringify(cargosUpdateData),
        });

        revalidatePath(`/cargos`);

        return result;
    } catch (error) {
        throw error;
    }
};
