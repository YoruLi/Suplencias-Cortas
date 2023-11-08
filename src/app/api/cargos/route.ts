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

export async function DELETE(req: Request) {
    const data = await req.json();

    try {
        const result = await conn.query(`DELETE FROM Cargos WHERE idCargos = ?`, data);
        console.log({ result });
        await conn.end();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req: Request) {
    const data = await req.json();
    const { docenteId, materias, curso, days, hour } = data;

    const objectData = {
        idCargos: crypto.randomUUID(),
        docenteId: docenteId,
        codigoMateria: materias,
        cursoId: curso,
        turno: days.join(", "),
        horario: hour.join(", "),
    };

    const res = await conn.query("INSERT INTO Cargos SET ?", objectData);
    await conn.end();
    return NextResponse.json("Se ha creado el cargo con exito!!");
}

export async function PUT(req: Request) {
    const data = await req.json();

    const objectData = {
        docenteId: data.docenteId,
        codigoMateria: data.codigoMateria,
        cursoId: data.cursoId,
        turno: data.turno,
        horario: data.horario,
    };

    const res = await conn.query("UPDATE Cargos SET ? WHERE idCargos = ?", [objectData, data.id]);

    await conn.end();

    return NextResponse.json({ res });
}
