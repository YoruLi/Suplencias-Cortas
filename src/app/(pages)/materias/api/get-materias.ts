"use server";

import { conn } from "@/libs/mysql/db";
import { fetcher } from "@/utils/fetch-url";
import { plainObject } from "@/utils/utils";

export const getMaterias = async (): Promise<Materia[] | []> => {
    try {
        const results = await fetcher({
            fetchUrl: "materias",
            method: "GET",
        });

        return results;
    } catch (error) {
        return [];
    }
};

export const getMateriasDocente = async (docenteId: string): Promise<Materia[] | []> => {
    if (!docenteId) {
        return [];
    }
    try {
        const result: Materia[] = await conn.query(`
        SELECT oblea.materias, materias.*
        FROM oblea
        JOIN docentes ON oblea.docenteId = docentes.idDocentes
        JOIN materias on oblea.materias = materias.codigoMateria
        WHERE docentes.idDocentes = '${docenteId}'

`);

        await conn.end();
        return plainObject(result);
    } catch (error) {
        return [];
    }
};
