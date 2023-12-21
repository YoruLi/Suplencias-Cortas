"use server";
import { fetcher } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";

export const update = async (data: Teacher, id: string) => {
    try {
        const result = await fetcher({
            fetchUrl: `docentes/${id}`,
            method: "PUT",
            data: JSON.stringify(data),
        });

        revalidatePath("/docentes");

        return {
            data: result,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: getErrorMessage(error),
        };
    }
};
