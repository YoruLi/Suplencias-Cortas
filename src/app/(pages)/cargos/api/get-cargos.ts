"use server";

import { conn } from "@/libs/mysql/db";

import { revalidatePath } from "next/cache";

export const getPaginationCargos = async ({ currentPage, pages }: { currentPage: number; pages: number }) => {
    try {
        const offset = (Number(currentPage) - 1) * Number(pages);
        const cargos = await conn.query(`
            SELECT Cargos.*, Titular.nombreCompleto as titular, Docentes.nombreCompleto AS nombreDocente, Cursos.nombre AS nombreCurso, Materias.nombre AS nombreMateria
            FROM Cargos
            LEFT JOIN Docentes ON Cargos.docenteId = Docentes.idDocentes
            LEFT JOIN Cursos ON Cargos.cursoId = Cursos.id
            LEFT JOIN Materias ON Cargos.codigoMateria = Materias.codigoMateria
            LEFT JOIN Docentes AS Titular ON Cargos.suplenteDe = Titular.idDocentes
            ORDER BY cargos.createdAt DESC
            LIMIT ${pages.toString()} OFFSET ${offset.toString()};
            `);
        revalidatePath("/cargos");

        console.log({ cargos });
        return cargos;
    } catch (error) {
        return [];
    }
};
