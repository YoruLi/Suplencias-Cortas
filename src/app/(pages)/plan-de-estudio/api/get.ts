"use server";

type PlanesDeEstudio = {
    id: string;
    nombre: string;
    descripcion: string;
    resolucion: string;
};
export const getPlanesDeEstudio = async (): Promise<PlanesDeEstudio[] | []> => {
    try {
        const res = await fetch(`http://localhost:3000/api/plan-de-estudio`, {
            cache: "no-cache",
            method: "GET",
        });

        const result = await res.json();

        return result;
    } catch (error) {
        return [];
    }
};
