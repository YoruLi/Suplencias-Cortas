import { conn } from "@/libs/mysql/db";
import { courseValidation } from "@/validation/zod";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("modalidad") as string;

    try {
        let courses: Curso[];
        if (query) {
            courses = await conn.query(
                "SELECT Cursos.*, Modalidades.nombre as modalidad FROM Cursos LEFT JOIN Modalidades ON Cursos.modalidadId = Modalidades.id WHERE Modalidades.nombre = ?",
                [query]
            );

            if (courses.length) {
            }
        } else {
            courses = await conn.query("SELECT Cursos.*, Modalidades.nombre as modalidad FROM Cursos LEFT JOIN Modalidades ON Cursos.modalidadId = Modalidades.id");
        }

        await conn.end();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const { curso, division, ciclo, modalidad } = data;

    try {
        const courseObjetData = {
            id: crypto.randomUUID(),
            nombre: `${curso} ${division}`,
            modalidadId: Number(modalidad),
            cicloLectivo: ciclo,
        };

        const validatedData = courseValidation.parse(courseObjetData);

        const course = await conn.query("INSERT INTO Cursos SET ?", validatedData);
        await conn.end();
        console.log({ course });

        return NextResponse.json({ message: "Curso creado con exito", data: validatedData });
    } catch (error) {
        return NextResponse.json({ message: "No se ha podido crear el curso", error: error });
    }
}

export async function PUT(req: Request) {
    const data = await req.json();

    const objectData = {
        ...(data.nombre && { nombre: data.nombre }),
        ...(data.modalidadId && { modalidadId: data.modalidadId }),
        ...(data.cicloLectivo && { cicloLectivo: data.cicloLectivo }),
    };

    const res = await conn.query("UPDATE Cursos SET ? WHERE id = ?", [objectData, data.id]);

    await conn.end();

    return NextResponse.json({ res });
}
