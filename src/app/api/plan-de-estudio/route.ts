import { conn } from "@/libs/mysql/db";
import { planValidation } from "@/validation/zod";
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
    const { nombre, descripcion, resolucion } = data;

    try {
        const objectData = {
            id: crypto.randomUUID(),
            nombre,
            descripcion,
            resolucion,
        };
        const validatedData = planValidation.parse(objectData);

        if (validatedData) {
            const result = await conn.query("INSERT INTO planesdeestudio SET ? ", objectData);

            await conn.end();
            return NextResponse.json(result);
        }
    } catch (error) {
        return NextResponse.json({ error });
    }
}
