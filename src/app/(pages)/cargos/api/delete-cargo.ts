"use server";

import { fetcher } from "@/utils/fetch-url";

export const deleteCargo = async (cargoId: string) => {
    try {
        const result = await fetcher({
            fetchUrl: `cargos/${cargoId}`,
            method: "DELETE",
        });

        return result;
    } catch (error) {
        return new Error("Error al borrar el cargo: " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
