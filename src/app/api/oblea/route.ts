import { conn } from "@/libs/mysql/db";
import { HttpResponse } from "@/utils/errors";

import { getErrorMessage } from "@/utils/get-error-message";
import { obleaSchema } from "@/validation/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const createObleaObject = {
            docenteId: data.docenteId,
            materias: data.materia.name.join(", "),
            score: data.score,
        };

        const validatedData = obleaSchema.safeParse(createObleaObject);

        if (!validatedData.success) {
            return NextResponse.json({ error: getErrorMessage(validatedData.error.issues) }, { status: 400 });
        }

        const oblea = await conn.query("INSERT INTO Oblea SET ?", createObleaObject);

        await conn.end();

        return NextResponse.json({ message: "Oblea creada con exito", data: oblea });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return new HttpResponse().ER_DUP_ENTRY();
        }
        return NextResponse.json({ message: "No se ha podido crear la oblea", error: error });
    }
}

export async function GET(req: Request) {
    try {
        const data = await conn.query(`
            SELECT Oblea.materias, 
            Docentes.nombreCompleto as docente, 
            Docentes.email, Oblea.score
             as puntaje FROM Oblea 
             LEFT JOIN Docentes ON Oblea.docenteId = Docentes.idDocentes 
            GROUP BY Oblea.docenteId;
        `);

        const individualQueries = data.map(async item => {
            const codes = item.materias.split(",").map(codigo => codigo.trim());
            const joinedCodes = codes.map(codigo => `'${codigo}'`).join(", ");

            const sqlQuery = `SELECT nombre FROM Materias WHERE codigoMateria IN (${joinedCodes})`;
            const subjects = await conn.query(sqlQuery);
            return {
                materias: subjects.map(result => result.nombre).join(", "),
                docente: item.docente,
                email: item.email,
                puntaje: item.puntaje,
            };
        });

        const results = await Promise.all(individualQueries);

        await conn.end();
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
