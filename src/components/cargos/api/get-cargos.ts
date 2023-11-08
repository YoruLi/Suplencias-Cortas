"use server";

export const getCargos = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/cargos`, {
            method: "GET",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return new Error("Error fetching teachers: " + (error instanceof Error ? error.message : "Unknown error"));
    }
};
