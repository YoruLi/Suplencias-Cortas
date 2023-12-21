import { conn } from "@/libs/mysql/db";
import { HttpNotFound, HttpResponse } from "@/utils/errors";
import { teacherValidation } from "@/validation/zod";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") as string;
    if (typeof query === "string" && query.length > 0) {
        try {
            const teachers: Teacher[] = await conn.query(`SELECT * FROM Docentes WHERE nombreCompleto LIKE '%${query}%' OR Docentes.email  `);

            if (teachers.length === 0) {
                throw new HttpNotFound();
            }
            await conn.end();

            return NextResponse.json(teachers);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    } else {
        try {
            const teachers = await conn.query(`
            SELECT * FROM Docentes 
            ORDER BY docentes.createdAt DESC
            LIMIT 5
      `);
            await conn.end();
            return NextResponse.json(teachers);
        } catch (error) {
            if (error instanceof HttpNotFound) {
                return new HttpResponse().NotFound();
            }
            return NextResponse.json(error, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const { name, lastname, email, tel, dni, dir, nac, antiguedadEsc, antiguedadDoc, localidad } = data;

    const fullname = `${name} ${lastname}`;
    const validatedData = teacherValidation.safeParse(data);
    if (!validatedData.success) {
        return NextResponse.json({ message: "Asegúrate de completar antes de continuar", error: validatedData.error }, { status: 400 });
    }
    try {
        const objectData = {
            idDocentes: crypto.randomUUID(),
            nombreCompleto: fullname,
            email,
            tel,
            dni,
            dir,
            nac: new Date(nac),
            antiguedadDoc: new Date(antiguedadDoc),
            antiguedadEsc: new Date(antiguedadEsc),
            localidad,
        };

        const newTeacher = await conn.query("INSERT INTO Docentes SET ? ", objectData);
        await conn.end();

        return NextResponse.json({ message: "Docente creado con exito", status: 200, data: newTeacher });
    } catch (error: any) {
        if (error.code === "ER_BAD_FIELD_ERROR") {
            return NextResponse.json({ message: "Asegúrate de completar antes de continuar", error }, { status: 400 });
        }
        return NextResponse.json({ message: "Error interno en el servidor", error }, { status: 500 });
    }
}
