import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const result = await conn.query("SELECT * FROM planesdeestudio");

        await conn.end();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    const { name, description, resolution } = data;
    console.log(description.length);
    console.log(resolution.length);
    try {
        const objectData = {
            id: crypto.randomUUID(),
            nombre: name,
            descripcion: description,
            resolucion: resolution,
        };
        const result = await conn.query("INSERT INTO planesdeestudio SET ? ", objectData);

        await conn.end();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function DELETE(req: Request) {
    const data = await req.json();

    try {
        const result = await conn.query(`DELETE FROM planesdeestudio WHERE id = ?`, data);
        await conn.end();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function PUT(req: Request) {
    const data = await req.json();

    const res = await conn.query("UPDATE planesdeestudio SET ? WHERE id = ?", [data, data.id]);

    await conn.end();

    return NextResponse.json({ res });
}
