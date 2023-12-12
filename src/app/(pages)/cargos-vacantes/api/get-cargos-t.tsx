"use server";
import { fetcher } from "@/utils/fetch-url";
import { revalidatePath } from "next/cache";

export const getCargosT = async () => {
    try {
        const result = await fetcher({
            fetchUrl: "cargos-vacantes",
            method: "GET",
        });

        return result;
    } catch (error) {
        return [];
    }
};
