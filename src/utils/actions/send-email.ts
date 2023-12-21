"use server";

import { fetcher } from "@/utils/fetch-url";
import { getErrorMessage } from "@/utils/get-error-message";

export const sendEmail = async (data: any) => {
    try {
        const info = {
            id: data.candidatoId,
            firstName: data?.nombreCompleto,
            email: data.email,
            days: data?.dias,
            hours: data?.horario,
            signature: data?.nombreMateria,
        };

        const result = await fetcher({
            fetchUrl: "send",
            method: "POST",
            data: JSON.stringify(info),
        });

        return result;
    } catch (error) {
        throw getErrorMessage(error);
    }
};
