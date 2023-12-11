"use server";
import { getErrorMessage } from "@/utils/get-error-message";
import toast from "react-hot-toast";
import { conn } from "@/libs/mysql/db";

export const getMaterias = async (): Promise<Materia[] | []> => {
    try {
        const res = await fetch(`http://localhost:3000/api/materias`, {
            cache: "no-store",
            method: "GET",
        });

        const result = await res.json();
        return result;
    } catch (error) {
        return [];
    }
};

export const getMateriasDocente = async (docenteId: string) => {
    if (!docenteId) {
        return [];
    }
    try {
        const result = await conn.query(`SELECT oblea.materias, materias.*
FROM oblea
JOIN docentes ON oblea.docenteId = docentes.idDocentes
JOIN materias on oblea.materias = materias.codigoMateria
WHERE docentes.idDocentes = '${docenteId}';

`);
        await conn.end();
        return result;
    } catch (error) {
        return toast.error(getErrorMessage(error));
    }
};
