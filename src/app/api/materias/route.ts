import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") as string;
    if (query) {
        try {
            const materias = await conn.query(
                `SELECT Materias.*, planesdeestudio.* FROM Materias JOIN planesdeestudio ON Materias.planDeEstudioId = planesdeestudio.id WHERE nombre = '${query}' `
            );

            await conn.end();

            return NextResponse.json(materias);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    } else {
        try {
            const materias = await conn.query(
                `SELECT Materias.*, planesdeestudio.nombre as planDeEstudio FROM Materias JOIN planesdeestudio ON Materias.planDeEstudioId = planesdeestudio.id`
            );

            await conn.end();

            return NextResponse.json(materias);
        } catch (error) {
            return NextResponse.json(error, { status: 500 });
        }
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const { name, year, planId } = data;

    const createSignatureObject = {
        codigoMateria: crypto.randomUUID(),
        nombre: name,
        año: year,
        planDeEstudioId: planId,
    };
    const signature = await conn.query("INSERT INTO Materias SET ?", createSignatureObject);
    await conn.end();
    return NextResponse.json({ message: "Materia creada con exito", data: signature });
}

export async function DELETE(req: Request) {
    const data = await req.json();
    console.log(data);

    try {
        const result = await conn.query(`DELETE FROM Materias WHERE codigoMateria = ?`, data);
        await conn.end();

        return NextResponse.json(result);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message });
    }
}

export async function PUT(req: Request) {
    const data = await req.json();

    const res = await conn.query("UPDATE Materias SET ? WHERE codigoMateria = ?", [data, data.codigoMateria]);
    console.log(res);
    await conn.end();

    return NextResponse.json({ res });
}
