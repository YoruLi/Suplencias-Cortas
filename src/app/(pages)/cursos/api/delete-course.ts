import { fetcher } from "@/utils/fetch-url";

export const deleteCourse = async (cursoId: string) => {
    try {
        const result = await fetcher({
            fetchUrl: `cursos/${cursoId}`,
            method: "DELETE",
        });

        return result;
    } catch (error) {
        return new Error("Error al borrar el curso " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
