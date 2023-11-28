export const getCargos = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/cargos`, {
            cache: "no-store",
            method: "GET",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
