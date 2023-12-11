import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const data = await req.json();

    const { candidatoId, cargoId } = data;
    console.log(candidatoId, cargoId);
    try {
        if (!candidatoId || !cargoId) {
            throw new Error("Data was not provided");
        }

        const prevDocente = await conn.query("SELECT d.idDocentes FROM Cargos JOIN Docentes as d ON Cargos.docenteId = d.idDocentes WHERE IdCargos = ? ", [cargoId]);
        const objectData = {
            docenteId: candidatoId,
            estado: "Asignado",
            suplenteDe: prevDocente,
        };

        await conn.query("UPDATE Cargos SET docenteId = ?, estado = ? WHERE idCargos = ? ", [objectData.docenteId, objectData.estado, cargoId]);
        // await conn.query(`ALTER TABLE Cargos ADD COLUMN suplenteDe VARCHAR(255) DEFAULT NULL`);
        await conn.query("UPDATE Cargos SET suplenteDe = ? WHERE idCargos = ?", [objectData.suplenteDe[0].idDocentes, cargoId]);
        await conn.query("DELETE FROM Candidatos WHERE cargoId = ?", [cargoId]);
        await conn.end();

        return NextResponse.json({ ...data }, { status: 204 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message });
    }
}
