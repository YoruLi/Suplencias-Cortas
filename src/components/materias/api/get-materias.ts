"use server";

export const getMaterias = async (): Promise<Materia[] | []> => {
    try {
        const res = await fetch(`http://localhost:3000/api/materias`, {
            method: "GET",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return [];
    }
};
