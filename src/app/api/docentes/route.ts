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

export async function DELETE(req: Request) {
    const data = await req.json();

    try {
        const result = await conn.query(`DELETE FROM Docentes WHERE idDocentes = ?`, data);

        await conn.end();
        return NextResponse.json(result);
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return NextResponse.json({ error: "El servidor ha respondido con un código de estado de error", status: error.response.status });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return NextResponse.json({ error: "La solicitud no pudo completarse debido a un problema de red", status: 500 });
        } else {
            // Something happened in setting up the request that triggered an Error
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return NextResponse.json({ error: "No se puede eliminar este curso porque está en uso", status: 409 });
            } else {
                return NextResponse.json({ error: "Ha ocurrido un error al intentar eliminar el curso", status: 500 });
            }
        }
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
