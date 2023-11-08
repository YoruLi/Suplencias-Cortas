export const deleteCargo = async (cargoId: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/cargos`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cargoId),
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return new Error("Error al borrar el cargo: " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
