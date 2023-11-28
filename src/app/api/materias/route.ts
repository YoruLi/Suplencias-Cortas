import { conn } from "@/libs/mysql/db";
import { signatureValidation } from "@/validation/zod";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const materias = await conn.query(`SELECT * FROM Materias `);

        await conn.end();
        return NextResponse.json(materias);
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const { name, year, planId } = data;

    try {
        const createSignatureObject = {
            codigoMateria: crypto.randomUUID(),
            nombre: name,
            año: year,
            planDeEstudioId: planId,
        };
        const validatedData = signatureValidation.parse(createSignatureObject);
        const signature = await conn.query("INSERT INTO Materias SET ?", validatedData);

        await conn.end();
        return NextResponse.json({ message: "Materia creada con exito", data: signature });
    } catch (error) {
        return NextResponse.json({ message: "No se ha podido crear la materia", error: error });
    }
}

export async function PUT(req: Request) {
    const data = await req.json();

    const res = await conn.query("UPDATE Materias SET ? WHERE codigoMateria = ?", [data, data.codigoMateria]);
    console.log(res);
    await conn.end();

    return NextResponse.json({ res });
}
