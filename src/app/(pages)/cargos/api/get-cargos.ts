"use server";

import { conn } from "@/libs/mysql/db";
import { plainObject } from "@/utils/utils";

import { revalidatePath } from "next/cache";

export const getPaginationCargos = async ({ query, currentPage, pages }: { query: string; currentPage: number; pages: number }) => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);
        const cargos: any[] = await conn.query(`
            SELECT Cargos.*, Titular.nombreCompleto as titular, Docentes.nombreCompleto AS nombreDocente, Cursos.nombre AS nombreCurso, Materias.nombre AS nombreMateria
            FROM Cargos
            LEFT JOIN Docentes ON Cargos.docenteId = Docentes.idDocentes
            LEFT JOIN Cursos ON Cargos.cursoId = Cursos.id
            LEFT JOIN Materias ON Cargos.codigoMateria = Materias.codigoMateria
            LEFT JOIN Docentes AS Titular ON Cargos.suplenteDe = Titular.idDocentes
            WHERE
            Docentes.nombreCompleto LIKE "%${query}%" OR
            Materias.nombre LIKE "%${query}%" OR
            Cargos.dias LIKE "%${query}%"
            ORDER BY cargos.createdAt DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);
        revalidatePath("/cargos");

        return plainObject(cargos);
    } catch (error) {
        return [];
    }
};

export async function fetchTeacherPositionPages({ query }: { query: string }) {
    try {
        const count = await conn.query(`SELECT COUNT(*)
    FROM Cargos
            LEFT JOIN Docentes ON Cargos.docenteId = Docentes.idDocentes
            LEFT JOIN Materias ON Cargos.codigoMateria = Materias.codigoMateria
            LEFT JOIN Docentes AS Titular ON Cargos.suplenteDe = Titular.idDocentes
            WHERE
            Docentes.nombreCompleto LIKE "%${query}%" OR
            Materias.nombre LIKE "%${query}%" OR
            Cargos.dias LIKE "%${query}%"
  `);

        const results = JSON.stringify(count);
        const json: TotalPages[] = JSON.parse(results);
        const totalPages = Math.ceil(Number(json[0].total) / 10);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of teacher position.");
    }
}
