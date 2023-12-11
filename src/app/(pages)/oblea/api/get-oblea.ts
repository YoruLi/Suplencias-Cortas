import { fetcher } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";

import { z } from "zod";

export const getOblea = async (id: string | undefined) => {
    try {
        const data = await fetcher({
            fetchUrl: "oblea",
            method: "GET",
        });
        return data;
    } catch (error: any) {
        return getErrorMessage(error);
    }
};
z;

export const getObleas = async () => {
    try {
        const data = await fetcher({
            fetchUrl: "oblea",
            method: "GET",
        });

        return data;
    } catch (error: any) {
        return getErrorMessage(error);
    }
};
z;
