import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let courses;

        courses = await conn.query(
            "SELECT CargosACubrir.*,  Cargos.docenteId, Cargos.codigoMateria, Cargos.cursoId, Cargos.dias, Cargos.horario, Docentes.nombreCompleto as nombreDocente, Materias.nombre as nombreMateria FROM CargosACubrir LEFT JOIN Cargos ON CargosACubrir.cargoId = Cargos.idCargos LEFT JOIN Docentes ON Cargos.docenteId = Docentes.idDocentes LEFT JOIN Materias ON Cargos.codigoMateria = Materias.codigoMateria;"
        );

        await conn.end();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
