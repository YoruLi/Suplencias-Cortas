import svgs from "@/data/svgs";
import { conn } from "@/libs/mysql/db";
import React from "react";
import AspectRatioContainer from "../ui/aspect-ratio-container";
import Icon from "../icon";
import { Card } from "../ui/card";

export async function getTotalData() {
    const results = await conn.query(
        `
  SELECT 'docentes' AS teachers, COUNT(*) AS cantidad_docentes FROM docentes
  UNION
  SELECT 'materias' AS signature, COUNT(*) AS cantidad_materias FROM materias
  UNION
  SELECT 'cursos' AS courses, COUNT(*) AS cantidad_cursos FROM cursos
`
    );

    const iconMap = {
        docentes: svgs.docenteIcon.path,
        materias: svgs.signatureIcon.path,
        cursos: svgs.courseIcon.path,
    };

    return results.map(data => ({
        table: data.teachers,
        cantidad: data.cantidad_docentes,
        icon: iconMap[data.teachers],
    }));
}

export default async function Cards() {
    const totalData = await getTotalData();
    return (
        <div className="flex  flex-wrap gap-4 items-center justify-evenly w-full  mb-8">
            {totalData.map(data => {
                return (
                    <Card className="max-w-[300px] w-full pb-2 ">
                        <div className="flex flex-col justify-around  gap-3 p-6 capitalize font-bold text-xl">
                            <div className="flex justify-between">
                                <span>{data.table}</span>
                                <Icon className="bg-main rounded-full fill-white py-1" path={data.icon} viewBox={svgs.docenteIcon.viewBox} />
                            </div>
                            <span>+{data.cantidad}</span>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
