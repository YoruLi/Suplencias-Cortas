import { conn } from "@/libs/mysql/db";
import { HttpStatus } from "@/utils/errors";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const result = await conn.query(`DELETE FROM Docentes WHERE idDocentes = ?`, params.id);

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
                return NextResponse.json({ error: "No se puede eliminar este docente porque está en uso", status: 409 });
            } else {
                return NextResponse.json({ error: "Ha ocurrido un error al intentar eliminar el docente", status: 500 });
            }
        }
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const objectData = {
        ...data,
    };
    try {
        const result = await conn.query("UPDATE Docentes SET ? WHERE idDocentes = ?", [objectData, params.id]);
        await conn.end();
        return NextResponse.json({ message: "Se ha actualizado el docente con éxito", data: result }, { status: HttpStatus.OK });
    } catch (error) {
        return NextResponse.json({ error }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }
}
