"use server";

import { fetcher } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";

export const deleteAction = async (entity: string, planId: string) => {
    try {
        const result = await fetcher({
            fetchUrl: `${entity}/${planId}`,
            method: "DELETE",
        });

        revalidatePath(`/${entity}`);
        return result;
    } catch (error: any) {
        throw error;
    }
};
