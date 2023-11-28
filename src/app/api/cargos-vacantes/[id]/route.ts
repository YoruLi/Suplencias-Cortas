import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    try {
        let courses;

        courses = await conn.query(
            "SELECT CargosACubrir.*, Cargos.* as cargosInfo FROM Cargos LEFT JOIN Cargos ON CargosACubrir.cargoId = Cargos.idCargos WHERE CargosACubrir.id = ? ",
            [params.id]
        );

        await conn.end();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
