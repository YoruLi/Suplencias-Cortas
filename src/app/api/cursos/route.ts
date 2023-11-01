import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await conn.query("SELECT * FROM Cursos");
        await conn.end();
        return NextResponse.json(courses);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: Request) {}
