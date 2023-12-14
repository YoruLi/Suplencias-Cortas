"use server";
import { fetcher } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";

export const updateCargos = async (data: FormData, cargo: Cargo) => {
    const cargosUpdateData = {
        ...data,
    };
    try {
        const result = await fetcher({
            fetchUrl: `cargos/${cargo.idCargos}`,
            method: "PUT",
            data: JSON.stringify(cargosUpdateData),
        });

        revalidatePath("/cargos");
        return { result, error: null };
    } catch (error) {
        return { result: null, error: getErrorMessage(error) };
    }
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
