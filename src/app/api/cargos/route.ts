import { conn } from "@/libs/mysql/db";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cargos = await conn.query(`
            SELECT Cargos.*, Docentes.nombreCompleto AS nombreDocente, Cursos.nombre AS nombreCurso, Materias.nombre AS nombreMateria
            FROM Cargos
            LEFT JOIN Docentes ON Cargos.docenteId = Docentes.idDocentes
            LEFT JOIN Cursos ON Cargos.cursoId = Cursos.id
            LEFT JOIN Materias ON Cargos.codigoMateria = Materias.codigoMateria
        `);

        await conn.end();
        return NextResponse.json(cargos);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req: Request) {
    const data = await req.json();
    const { docente, materia, curso, dias, horario } = data;

    const objectData = {
        idCargos: crypto.randomUUID(),
        docenteId: docente,
        codigoMateria: materia,
        cursoId: curso,
        dias,
        horario,
    };

    const res = await conn.query("INSERT INTO Cargos SET ?", objectData);
    await conn.end();
    return NextResponse.json("Se ha creado el cargo con exito!!");
}
