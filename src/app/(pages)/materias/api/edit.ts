import { fetcher } from "@/utils/fetch-url";

export const editSignature = async (id: string, data: Curso) => {
    try {
        const result = await fetcher({
            fetchUrl: `materias/${id}`,
            method: "PUT",
            data: JSON.stringify(data),
        });

        return result;
    } catch (error) {
        return error;
    }
};
