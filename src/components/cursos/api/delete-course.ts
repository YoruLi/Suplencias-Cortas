export const deleteCourse = async (cursoId: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/cursos`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cursoId),
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return new Error("Error al borrar el curso " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
