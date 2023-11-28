import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let courses;

        courses = await conn.query("SELECT CargosACubrir.*, Cargos.* FROM CargosACubrir LEFT JOIN Cargos ON CargosACubrir.cargoId = Cargos.idCargos");

        await conn.end();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
