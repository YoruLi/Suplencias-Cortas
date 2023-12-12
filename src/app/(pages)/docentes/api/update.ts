"use server";
import { fetcher } from "@/utils/fetch-url";
import { revalidatePath } from "next/cache";

export const update = async (data: Teacher) => {
    try {
        const result = fetcher({
            fetchUrl: `docentes/${data.idDocentes}`,
            method: "PUT",
            data: JSON.stringify(data),
        });
        revalidatePath("/docentes");
        return result;
    } catch (error) {
        return error;
    }
};
