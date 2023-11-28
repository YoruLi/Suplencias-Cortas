import { conn } from "@/libs/mysql/db";
import { teacherValidation } from "@/validation/zod";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") as string;
    if (typeof query === "string" && query.length > 0) {
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
    const validatedData = teacherValidation.safeParse(data);
    if (!validatedData.success) {
        return NextResponse.json({ message: "Asegúrate de completar antes de continuar", status: 400, error: validatedData.error });
    }
    try {
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

        return NextResponse.json({ message: "Docente creado con exito", status: 200, data: newTeacher });
    } catch (error: any) {
        console.log(error);
        if (error.code === "ER_BAD_FIELD_ERROR") {
            return NextResponse.json({ message: "Asegúrate de completar antes de continuar", status: 400, error: error });
        }
        return NextResponse.json({ message: "Se produjo un error", status: 400, error: error });
    }
}

export async function PUT(req: Request) {
    const data = await req.json();
    const objectData = {
        ...data,
        idDocentes: data.idDocentes,
    };
    const res = await conn.query("UPDATE Docentes SET ? WHERE idDocentes = ?", [objectData, data.idDocentes]);
    console.log({ res });
    await conn.end();

    return NextResponse.json({ res });
}
