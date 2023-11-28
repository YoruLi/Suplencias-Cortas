import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }) {
    const data = await req.json();

    const objectData = {
        ...(data.codigoMateria && { codigoMateria: data.codigoMateria }),
        ...(data.cursoId && { cursoId: data.cursoId }),
        ...(data.docenteId && { docenteId: data.docenteId }),
        ...(data.turno && { dias: data.turno }),
        ...(data.horario && { horario: data.horario }),
        ...(data.state && { estado: data.state }),
    };

    try {
        if (!params.id) {
            throw new Error("ID is required");
        }

        const res = await conn.query("UPDATE cargos SET ? WHERE idCargos =? ", [objectData, params.id]);

        await conn.end();

        return NextResponse.json({ ...data, id: params.id }, { status: 204 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE(req: Request, { params }) {
    try {
        const result = await conn.query(`DELETE FROM Cargos WHERE idCargos = ?`, params.id);

        await conn.end();
        return NextResponse.json({ status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
