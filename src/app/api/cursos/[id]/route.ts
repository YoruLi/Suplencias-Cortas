import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }) {
    if (!params.id) {
        return NextResponse.json("Id is required");
    }
    try {
        const result = await conn.query(`DELETE FROM Cursos WHERE id = ?`, params.id);

        await conn.end();
        return NextResponse.json(result);
    } catch (error: any) {
        if (error.response) {
            return NextResponse.json({ message: "El servidor ha respondido con un código de estado de error", status: error.response.status });
        } else if (error.request) {
            return NextResponse.json({ message: "La solicitud no pudo completarse debido a un problema de red", status: 500 });
        } else {
            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return NextResponse.json({ message: "No se puede eliminar este curso porque está en uso", status: 409 });
            } else {
                return NextResponse.json({ message: "Ha ocurrido un error al intentar eliminar el curso", status: 500 });
            }
        }
    }
}
