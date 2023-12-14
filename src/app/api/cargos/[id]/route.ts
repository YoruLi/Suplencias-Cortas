import { conn } from "@/libs/mysql/db";
import { HttpError, HttpNotFound, HttpResponse, HttpStatus } from "@/utils/errors";
import { getErrorMessage } from "@/utils/get-error-message";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();

    const objectData = {
        ...(data.codigoMateria && { codigoMateria: data.codigoMateria }),
        ...(data.cursoId && { cursoId: data.cursoId }),
        ...(data.docentes && { docenteId: data.docentes }),
        ...(data.days && { dias: data.days.join(", ") }),
        ...(data.hours && { horario: Object.values(data.hours).flat(1).join(", ") }),
        ...(data.state && { estado: data.state }),
    };

    const httpResponse = new HttpResponse();
    try {
        if (!params.id) {
            throw new Error("ID is required");
        }

        if (objectData.docenteId) {
            const isAllowed = await conn.query(
                `SELECT 1
            FROM Oblea
            JOIN Docentes ON Oblea.docenteId = Docentes.idDocentes
            JOIN Cargos ON Docentes.idDocentes = ? AND Cargos.idCargos = ?
            WHERE FIND_IN_SET(Cargos.codigoMateria, Oblea.materias) > 0`,
                [objectData.docenteId, params.id]
            );

            if (isAllowed.length === 0) {
                throw new HttpNotFound("El docente no puede cubrir este cargo");
            }
        }

        const res = await conn.query("UPDATE cargos SET ? WHERE idCargos = ? ", [objectData, params.id]);
        await conn.end();

        return NextResponse.json({ ...data, id: params.id });
    } catch (error) {
        console.log(error);
        if (error instanceof HttpNotFound) {
            return httpResponse.NotFound(null, getErrorMessage(error));
        }
        return httpResponse.InternalServerError();
    }
}

export async function DELETE(req: Request, { params }) {
    try {
        const result = await conn.query(`DELETE FROM Cargos WHERE idCargos = ?`, params.id);

        await conn.end();
        return new Response(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
