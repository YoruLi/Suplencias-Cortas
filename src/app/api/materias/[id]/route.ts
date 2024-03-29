import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const result = await conn.query(`DELETE FROM Materias WHERE codigoMateria = ?`, params.id);

        await conn.end();
        return NextResponse.json(result);
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return NextResponse.json({ message: "El servidor ha respondido con un código de estado de error", status: error.response.status });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return NextResponse.json({ message: "La solicitud no pudo completarse debido a un problema de red", status: 500 });
        } else {
            // Something happened in setting up the request that triggered an Error
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return NextResponse.json({ message: "No se puede eliminar esta materia porque está en uso", status: 409 });
            } else {
                return NextResponse.json({ message: "Ha ocurrido un error al intentar eliminar la materia", status: 500 });
            }
        }
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();

    try {
        const res = await conn.query("UPDATE Materias SET ? WHERE codigoMateria = ?", [data, params.id]);

        await conn.end();

        return NextResponse.json({ ...data, id: params.id }, { status: 204 });
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        });
    }
}
