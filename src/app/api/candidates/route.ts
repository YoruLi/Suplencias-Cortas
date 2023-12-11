import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("cargoId") as string;

    try {
        const candidates = await conn.query(
            `
            SELECT Candidatos.*, c.*, m.nombre as nombreMateria, 
            d.nombreCompleto, d.email, d.tel, o.score FROM Candidatos 
            JOIN Docentes as d ON Candidatos.candidatoId = d.idDocentes 
            JOIN Cargos as c ON Candidatos.cargoId = c.idCargos 
            JOIN Materias as m ON c.codigoMateria = m.codigoMateria 
            JOIN Oblea as o ON Candidatos.candidatoId = o.docenteId
            WHERE cargoId = ?
           ORDER BY 
            o.score DESC,
            d.antiguedadDoc DESC,
            d.antiguedadEsc DESC
            `,
            [query]
        );

        await conn.end();
        return NextResponse.json(candidates);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
