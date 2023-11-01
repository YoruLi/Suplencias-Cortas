import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") as string;
    if (query) {
        try {
            const materias = await conn.query(`SELECT * FROM Materias WHERE nombre = '${query}' `);
            await conn.end();

            return NextResponse.json(materias);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    } else {
        try {
            const materias = await conn.query("SELECT * FROM Materias");
            await conn.end();
            return NextResponse.json(materias);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    }
}

export async function POST(req: Request) {}
