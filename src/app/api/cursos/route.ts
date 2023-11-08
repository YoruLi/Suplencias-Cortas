import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("modalidad") as string;

    try {
        let courses;
        if (query) {
            console.log(query);
            courses = await conn.query(
                "SELECT Cursos.*, Modalidades.nombre as modalidad FROM Cursos LEFT JOIN Modalidades ON Cursos.modalidadId = Modalidades.id WHERE Modalidades.nombre = ?",
                [query]
            );
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

    const courseObjetData = {
        id: crypto.randomUUID(),
        nombre: `${curso} ${division}`,
        modalidadId: Number(modalidad),
        cicloLectivo: ciclo,
    };
    const courses = await conn.query("INSERT INTO Cursos SET ?", courseObjetData);
    await conn.end();
    return NextResponse.json({ message: "Curso creado con exito", data: courses });
}

export async function DELETE(req: Request) {
    const data = await req.json();

    try {
        const result = await conn.query(`DELETE FROM Cursos WHERE id = ?`, data);

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
        ...(data.nombre && { nombre: data.nombre }),
        ...(data.modalidadId && { modalidadId: data.modalidadId }),
        ...(data.cicloLectivo && { cicloLectivo: data.cicloLectivo }),
    };

    const res = await conn.query("UPDATE Cursos SET ? WHERE id = ?", [objectData, data.id]);

    await conn.end();

    return NextResponse.json({ res });
}
