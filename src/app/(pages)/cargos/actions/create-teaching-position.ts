"use server";

import { redirect } from "next/navigation";

export const createTeachingPosition = async (data: any) => {
    const curso = data.curso;
    const materia = data.materia;
    const docente = data.docentes;
    const daysAndHours = data.hours;
    const days = Object.keys(daysAndHours);
    const hours = Object.values(daysAndHours);

    const cargos = {
        docente,
        materia,
        curso,
        dias: days.join(", "),
        horario: hours.flat(1).join(", "),
    };

    const res = await fetch(`http://localhost:3000/api/cargos`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cargos),
    });

    await res.json();

    return redirect("/cargos");
};
