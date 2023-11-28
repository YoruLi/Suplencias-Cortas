import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }) {
    try {
        const result = await conn.query(`DELETE FROM planesdeestudio WHERE id = ?`, params.id);
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
                return NextResponse.json({ message: "No se puede eliminar este plan de estudio porque está en uso", status: 409 });
            } else {
                return NextResponse.json({ message: "Ha ocurrido un error al intentar eliminar el plan de estudio", status: 500 });
            }
        }
    }
}

export async function PUT(req: Request, { params }) {
    const data = await req.json();

    const res = await conn.query("UPDATE planesdeestudio SET ? WHERE id = ?", [data, params.id]);

    await conn.end();

    return NextResponse.json({ res });
}
