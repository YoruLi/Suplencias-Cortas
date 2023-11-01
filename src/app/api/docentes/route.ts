import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") as string;
    if (query) {
        try {
            const teachers = await conn.query(`SELECT * FROM Docentes WHERE nombreCompleto LIKE '%${query}%' `);
            await conn.end();

            return NextResponse.json(teachers);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    } else {
        try {
            const teachers = await conn.query("SELECT * FROM Docentes");
            await conn.end();
            return NextResponse.json(teachers);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const { name, lastname, email, tel, dni, dir, score } = data;

    const fullname = `${name} ${lastname}`;

    const objectData = {
        idDocentes: crypto.randomUUID(),
        nombreCompleto: fullname,
        email,
        tel,
        dni,
        dir,
        score: Number(score),
    };

    const newTeacher = await conn.query("INSERT INTO Docentes SET ? ", objectData);
    await conn.end();

    return NextResponse.json({ message: "Docente creado con exito", status: 200 });
}
