import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const candidates = await conn.query("SELECT * FROM Candidatos");

        await conn.end();
        return NextResponse.json(candidates);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
