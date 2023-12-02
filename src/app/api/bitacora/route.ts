import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const bitacora = await conn.query(`SELECT * FROM bitacora `);

        await conn.end();

        return NextResponse.json(bitacora);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
